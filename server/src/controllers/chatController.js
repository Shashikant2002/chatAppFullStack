import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATES,
} from "../constants/socketEvents.js";
import { ChatSchema } from "../models/chatModal.js";
import { MessageSchema } from "../models/messageModal.js";
import { UserSchema } from "../models/userModal.js";
import catchAsyncHandaler from "../utils/CatchAsyncHandaler.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import { getOtherMembers } from "../utils/Helpers.js";
import deleteFileFromClounery from "../utils/deleteFileFromCloudnery.js";
import { emitEvent } from "../utils/socketIoHelpers.js";

export const getMyChat = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;

  console.log(user?._id);

  const groupChat = await ChatSchema.find({ members: user?._id }).populate([
    "creator",
    "members",
  ]);

  const transformChat = groupChat.map(({ _id, name, group_chat, members }) => {
    const otherMember = getOtherMembers(members, user?._id);

    return {
      _id: _id,
      name: group_chat ? name : otherMember.name,
      group_chat: group_chat,
      avatar: group_chat
        ? members?.slice(0, 3)?.map((ele) => ele?.avatar?.url)
        : [otherMember?.avatar?.url],
      members: members?.reduce((prev, curr) => {
        if (curr._id.toString() !== user?._id.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  res.status(200).json({
    success: true,
    message: `Chates Find Successfull !!`,
    chat: transformChat,
  });
});

export const getMyGroup = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;

  const chats = await ChatSchema.find({
    members: user._id,
    group_chat: true,
    creator: user._id,
  }).populate(["creator", "members"]);

  console.log(chats[0]?.members);

  let chatTransform = chats?.map(({ _id, name, group_chat, members }) => {
    return {
      _id,
      name,
      group_chat,
      avatar: members?.slice(0, 3)?.map((ele) => ele?.avatar?.url),
      members: members?.reduce((prev, curr) => {
        if (curr._id.toString() !== user?._id.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  res.status(200).json({
    success: true,
    message: "My Groups fetched Successfull !!",
    chats: chatTransform,
  });
});

export const removeMembersInGroup = catchAsyncHandaler(
  async (req, res, next) => {
    const user = req.user;
    const { group_id } = req.params;
    const { removeMembers } = req.body;

    if (!removeMembers || removeMembers?.length <= 0) {
      return next(new ErrorHandeler("Please Provide Member !!", 400));
    }

    const chats = await ChatSchema.findOne({
      _id: group_id,
      creator: user._id,
      group_chat: true,
    });

    if (!chats) {
      return next(new ErrorHandeler("Group Not Found !!", 400));
    }

    let newChats = [];

    let isCreator = false;

    chats?.members?.forEach((member) => {
      let isinclude = removeMembers?.find(
        (inputMember) => member == inputMember
      );

      if (isinclude == chats?.creator) {
        isCreator = true;
      }

      if (!isinclude) {
        newChats.push(member);
      }
    });

    if (isCreator) {
      const randomNumber = Math.floor(Math.random() * newChats?.length);

      chats.creator = newChats[randomNumber];

      console.log("Working =============>>>>>>>>>>>>>>", newChats[0]);
    }

    chats.members = newChats;
    await chats.save();

    // Emiting Area Start ===================>>>>>>>>>>>>>>
    const removedMembers = await UserSchema.find({ _id: removeMembers });
    let allMembersNameForEmit = removedMembers?.map((member) => member.name);

    await emitEvent(
      req,
      ALERT,
      newChats,
      `${allMembersNameForEmit?.join(" ")} are Removed From Group !!`
    );
    await emitEvent(req, REFETCH_CHATES, newChats, ``);
    // Emiting Area Start ===================>>>>>>>>>>>>>>

    res.status(200).json({
      success: true,
      message: "Member Removed Successfull !!",
      chats: chats,
    });
  }
);

export const leaveGroup = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { group_id } = req.params;

  if (!group_id) {
    return next(new ErrorHandeler("Please Provide Group Id !!", 400));
  }

  const chats = await ChatSchema.findOne({
    _id: group_id,
    members: user._id,
    group_chat: true,
  });

  if (!chats) {
    return next(new ErrorHandeler("Group Not Found !!", 400));
  }

  let newChats = [];

  chats?.members?.forEach((member) => {
    if (user._id.toString() !== member.toString()) {
      newChats.push(member);
    }
  });

  console.log(newChats);

  if (user?._id?.toString() == chats?.creator?.toString()) {
    const randomNumber = Math.floor(Math.random() * newChats?.length);
    chats.creator = newChats[randomNumber];
  }
  chats.members = newChats;
  await chats.save();

  // Emiting Area Start ===================>>>>>>>>>>>>>>
  await emitEvent(req, ALERT, newChats, `${user?.name} are Leav The Group !!`);
  await emitEvent(req, REFETCH_CHATES, newChats, ``);
  // Emiting Area Start ===================>>>>>>>>>>>>>>

  res.status(200).json({
    success: true,
    message: `${user?.name} are Leav The Group !!`,
    chats: chats,
  });
});

export const addMembersInGroup = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { group_id } = req.params;
  const { addMembers } = req.body;

  if (!addMembers || addMembers?.length <= 0) {
    return next(new ErrorHandeler("Please Provide Member !!", 400));
  }

  const chats = await ChatSchema.findOne({
    _id: group_id,
    creator: user._id,
    group_chat: true,
  });

  if (!chats) {
    return next(
      new ErrorHandeler("Group Not Found OR You are not Admin !!", 400)
    );
  }

  let newChats = [...chats.members];
  addMembers?.forEach((element) => {
    let isAddedInGroup = newChats?.find((ele) => ele == element);
    if (!isAddedInGroup) {
      newChats?.push(element);
    }
  });
  chats.members = newChats;
  await chats.save();

  const chatMember = await ChatSchema.findById(chats._id).populate(["members"]);

  let allMembersForEmit = chatMember?.members?.map((member) => member._id);
  let allMembersNameForEmit = chatMember?.members?.map((member) => member.name);

  // console.log(allMembersNameForEmit.join(" "));

  await emitEvent(
    req,
    ALERT,
    allMembersForEmit,
    `All Members Welcome to ${allMembersNameForEmit.join(" ")} in our Group !!`
  );
  await emitEvent(req, REFETCH_CHATES, allMembersForEmit, ``);

  res.status(200).json({
    success: true,
    message: "Member Added Successfull !!",
    chats: chats,
  });
});

export const create_group = catchAsyncHandaler(async (req, res, next) => {
  const { name, members } = req.body;

  if (!name || members.length < 2) {
    return next(new ErrorHandeler("Group Chat Must Have 3 Members !!", 400));
  }

  const allMembers = [...members, req.user._id];

  const createChat = await ChatSchema.create({
    name,
    group_chat: true,
    creator: req.user,
    members: allMembers,
  });

  await emitEvent(req, ALERT, allMembers, `Welcome to ${name} Group !!`);
  await emitEvent(req, REFETCH_CHATES, members, ``);

  res.status(200).json({
    success: true,
    message: `${name} Group Created Successfull !!`,
    createChat,
  });
});

export const sendAttachment = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { chatId, message: inputMessage } = req.body;

  if (!chatId) {
    return next(new ErrorHandeler("Please Provide Chat Id !!", 400));
  }

  const chat = await ChatSchema.findById(chatId);

  if (!chat) {
    return next(new ErrorHandeler("Chat Not Found !!", 400));
  }

  const files = req.files || [];

  console.log(files);

  if (files.length < 1) {
    return next(new ErrorHandeler("Please Proid file Attachment !!", 400));
  }

  const attachment = [];
  const messageForDB = {
    content: inputMessage,
    sender: user._id,
    chat: chat._id,
    attachments: attachment,
  };

  const message = await MessageSchema.create(messageForDB);

  // Emiting Chates Start ====================>>>>>>>>>>>>>>>>>>>
  const messageForRealTime = {
    content: inputMessage,
    sender: { _id: user._id, name: user.name },
    chat: chat._id,
    attachments: attachment,
  };

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId: chat._id,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId: chat._id,
  });
  // Emiting Chates End ====================>>>>>>>>>>>>>>>>>>>

  return res.status(200).json({
    success: true,
    message: message,
  });
});

export const getChatById = catchAsyncHandaler(async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query;
  const user = req.user;

  const findChat = await ChatSchema.findById(id);

  let isMyChat = findChat?.members?.includes(user._id);

  if (!isMyChat) {
    return next(new ErrorHandeler("Not Your Friend !!", 400));
  }

  if (!id) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  let groupChat;

  if (populate == "true") {
    let data_populate = await ChatSchema.findById(id)
      .populate(["creator", "members"])
      .lean();

    if (!data_populate) {
      return next(new ErrorHandeler("Chat is not found !!", 400));
    }

    groupChat = data_populate;

    groupChat.members = data_populate?.members?.map(
      ({ _id, name, avatar, user_id, user_name, email, bio }) => ({
        _id,
        name,
        avatar: avatar?.url,
        user_id,
        user_name,
        email,
        bio,
      })
    );
  } else {
    let findedData = await ChatSchema.findById(id);
    if (!findedData) {
      return next(new ErrorHandeler("Chat is not found !!", 400));
    }
    groupChat = findedData;
  }

  res.status(200).json({
    success: true,
    message: `Chates Find Successfull !!`,
    chat: groupChat,
  });
});

export const renameGroup = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;

  const { id } = req.params;

  const { newName } = req.body;

  if (!id) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  let data_populate = await ChatSchema.findOne({
    _id: id,
    creator: user._id,
    group_chat: true,
  });

  if (!data_populate) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  data_populate.name = newName;

  await data_populate.save();

  let selectedData = {
    name: data_populate.name,
  };

  // Emiting Chates Start ====================>>>>>>>>>>>>>>>>>>>
  emitEvent(req, REFETCH_CHATES, data_populate.members);
  // Emiting Chates End ====================>>>>>>>>>>>>>>>>>>>

  res.status(200).json({
    success: true,
    message: `Group Name Updated Successfull !!`,
    updatedChat: selectedData,
  });
});

export const deleteChat = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  let data_populate = await ChatSchema.findOne({ _id: id });

  if (!data_populate) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  if (
    data_populate?.group_chat &&
    data_populate?.creator.toString() !== user._id.toString()
  ) {
    return next(
      new ErrorHandeler("You Have Not Allow to Delete This Chat !!", 400)
    );
  }

  if (
    !data_populate?.group_chat &&
    !data_populate?.members.includes(user._id.toString())
  ) {
    return next(
      new ErrorHandeler("You Have Not Allow to Delete This Chat !!", 400)
    );
  }

  // Deleting Message And Attachment Files Start ==================>>>>>>>>>>>>>>>>>>>>>>>>

  // Emiting Chates Start ====================>>>>>>>>>>>>>>>>>>>
  emitEvent(req, REFETCH_CHATES, data_populate.members);
  // Emiting Chates End ====================>>>>>>>>>>>>>>>>>>>

  const findAllMessages = await MessageSchema.find({
    chat: data_populate._id,
    attachments: {
      $exists: true,
      $ne: [],
    },
  });

  let allAttachemts = [];

  findAllMessages?.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      allAttachemts.push(public_id);
    });
  });

  await Promise.all([
    deleteFileFromClounery(allAttachemts),
    ChatSchema.deleteOne(data_populate._id),
    MessageSchema.deleteMany({ chat: data_populate._id }),
  ]);

  // Deleting Message And Attachment Files End ==================>>>>>>>>>>>>>>>>>>>>>>>>

  const deletedData = {
    _id: data_populate._id,
    name: data_populate.name,
  };

  res.status(200).json({
    success: true,
    message: `Group Deleted Successfull !!`,
    deletedChat: deletedData,
  });
});

export const getMessages = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const findChat = await ChatSchema.findById(id);

  let isMyChat = findChat?.members?.includes(user._id);

  if (!isMyChat) {
    return next(new ErrorHandeler("Not Your Friend !!", 400));
  }

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  console.log(skip, limit);

  if (!id) {
    return next(new ErrorHandeler("Chat is not found !!", 400));
  }

  let [data_populate, totalMessagesCount] = await Promise.all([
    MessageSchema.find({
      chat: id,
    })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name _id")
      .sort({ createdAt: -1 })
      .lean(),
    MessageSchema.countDocuments({ chat: id }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / limit);

  let newDataMain = data_populate.reverse()

  res.status(200).json({
    success: true,
    message: `Message Finded Successfull !!`,
    messages: newDataMain,
    pages: totalPages,
  });
});
