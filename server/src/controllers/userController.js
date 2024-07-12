import { UserSchema } from "../models/userModal.js";
import catchAsyncHandaler from "../utils/CatchAsyncHandaler.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import { v4 as uuidv4 } from "uuid";
import sendToken from "../utils/SendToken.js";

import CookiesName from "../constants/cookiesToken.js";
import { ChatSchema } from "../models/chatModal.js";
import { RequestSchema } from "../models/requestModal.js";
import { emitEvent } from "../utils/socketIoHelpers.js";
import { NEW_REQUEST, REFETCH_CHATES } from "../constants/socketEvents.js";
import { getOtherMembers } from "../utils/Helpers.js";
import { UploadFileToCloudinary } from "../utils/cloudinary.js";

export const loginUser = catchAsyncHandaler(async (req, res, next) => {
  const { email, password } = req.body;

  // console.log(email, password);

  if (!email || !password) {
    return next(new ErrorHandeler("Please Fill All The Fields !!", 400));
  }
  if (password.length < 8) {
    return next(new ErrorHandeler("Password Should be in 8 Character !!", 400));
  }

  const isUser = await UserSchema.findOne({
    $or: [{ email: email }],
  }).select("+password");

  if (!isUser) {
    return next(
      new ErrorHandeler(
        "User Is Not Found !!. Please Register And try Again.",
        400
      )
    );
  }

  const isPassTrue = await isUser.comparePassword(password);

  if (!isPassTrue) {
    return next(new ErrorHandeler("Email OR Password is Wrong !!", 400));
  }

  sendToken(res, isUser, 200, `Login Successfull. ${isUser?.name}`);
});

export const registerUser = catchAsyncHandaler(async (req, res, next) => {
  const { name, email, password, cPassword } = req.body;

  const avatar = req.file;

  if (!avatar) {
    return next(new ErrorHandeler("Please Provide a Profile Picture !!", 400));
  }

  if (!name || !email || !password || !cPassword) {
    return next(new ErrorHandeler("Please Fill All The Fields !!", 400));
  }
  if (password.length < 8) {
    return next(new ErrorHandeler("Password Should be in 8 Character !!", 400));
  }
  if (password !== cPassword) {
    return next(
      new ErrorHandeler("Password and Confirm Password is not Match !!", 400)
    );
  }

  const userId = uuidv4();
  const userName = `${name.slice(0, 4)}_${uuidv4().slice(0, 8)}`.toUpperCase();

  const isUser = await UserSchema.findOne({
    $or: [{ user_id: userId }, { user_name: userName }, { email: email }],
  });

  if (isUser) {
    return next(
      new ErrorHandeler("User is Already Exiest. Please Try Again !!", 400)
    );
  }

  const result = await UploadFileToCloudinary(`/user/images`, [avatar]);

  console.log(result);

  let image = {};

  if (result.length > 0) {
    image = { public_id: result[0].public_id, url: result[0].url };
  }

  const user = await UserSchema.create({
    user_id: userId,
    user_name: userName,
    name,
    email,
    password,
    avatar: image,
  });

  sendToken(res, user, 200, `Register Successfull. ${name}`);
});

export const me = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Login Successfull !!",
    user: user,
  });
});

export const logout = catchAsyncHandaler(async (req, res, next) => {
  const option = {
    maxAge: 0,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  const token = "";

  return res
    .status(200)
    .cookie(CookiesName?.LOGIN_TOKEN_NAME, token, option)
    .json({
      success: true,
      message: "Logout Successfull !!",
    });
});

export const users = catchAsyncHandaler(async (req, res, next) => {
  const { search, limit = 1, page = 1 } = req.query;

  const skip = (page - 1) * limit;

  const searchStr = search?.toLowerCase();



  console.log("req.body", skip);

  let user = [];
  let userCount = 0;

  if (search.toLowerCase() == "all") {
    const [users, userCounts] = await Promise.all([
      UserSchema.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      UserSchema.countDocuments(),
    ]);

    user = users;
    userCount = userCounts;
  } else {
    const [users, userCounts] = await Promise.all([
      UserSchema.find({
        $or: [
          {
            user_id: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            user_name: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            name: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchStr,
              $options: "i",
            },
          },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UserSchema.countDocuments({
        $or: [
          {
            user_id: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            user_name: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            name: {
              $regex: searchStr,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchStr,
              $options: "i",
            },
          },
        ],
      }),
    ]);

    user = users;
    userCount = userCounts;
  }

  console.log("user =========>>>>>>>>>>>>> ", user);

  const totalPages = Math.ceil(userCount / limit);

  res.status(200).json({
    success: true,
    message: "User Find Successfull !!",
    user: user,
    pages: totalPages,
  });
});

export const userFindById = catchAsyncHandaler(async (req, res, next) => {
  const { user_id } = req.params;

  let user = await UserSchema.findById(user_id);

  res.status(200).json({
    success: true,
    message: "User Find Successfull !!",
    user: user,
  });
});

export const searchUsers = catchAsyncHandaler(async (req, res, next) => {
  const { search, limit, page } = req.query;
  const me = req.user;

  console.log(search, limit, page);

  const skip = (Number(page) - 1) * Number(limit);

  const searchStr = search?.toLowerCase();
  console.log(skip);

  let user = [];
  let userCount = 0;

  const myChates = await ChatSchema.find({
    group_chat: false,
    members: me._id,
  });

  let myFriends = myChates?.flatMap((chat) => chat.members);

  console.log("myFriends", myFriends);

  const [users, userCounts] = await Promise.all([
    UserSchema.find({
      _id: {
        $nin: myFriends,
      },
      $or: [
        {
          user_id: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          user_name: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          name: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchStr,
            $options: "i",
          },
        },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean(),
    UserSchema.countDocuments({
      _id: {
        $nin: myFriends,
      },
      $or: [
        {
          user_id: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          user_name: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          name: {
            $regex: searchStr,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchStr,
            $options: "i",
          },
        },
      ],
    }),
  ]);

  user = users.map((user) => ({ ...user, avatar: user?.avatar?.url }));
  userCount = userCounts;
  const totalPages = Math.ceil(userCount / limit);

  res.status(200).json({
    success: true,
    message: "User Find Successfull !!",
    user: user,
    pages: totalPages,
  });
});

export const sendFriendRequest = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;
  const { receiver } = req.body;

  if (user._id.toString() == receiver) {
    return next(new ErrorHandeler("Invalid User id !!", 400));
  }

  if (!receiver) {
    return next(new ErrorHandeler("User Not Found !!", 400));
  }

  const isUser = await UserSchema.findById(receiver);
  if (!isUser) {
    return next(new ErrorHandeler("User Not Found !!", 400));
  }

  const isRequestSanded = await RequestSchema.findOne({
    $or: [
      {
        sender: user._id,
        receiver: isUser._id,
        status: "pending",
      },
      {
        sender: isUser._id,
        receiver: user._id,
        status: "pending",
      },
    ],
  });

  console.log(isRequestSanded);

  if (isRequestSanded) {
    return next(new ErrorHandeler("Request Already Sanded !!", 400));
  }

  await RequestSchema.create({
    sender: user._id,
    receiver: isUser._id,
  });

  // Emiting Message Start ======================<<<<<<<<<<<<<<<<
  emitEvent(req, NEW_REQUEST, [isUser._id]);
  // Emiting Message End ======================<<<<<<<<<<<<<<<<

  return res.status(200).json({
    success: true,
    message: `Request Send Successfull to ${isUser?.name} !!`,
  });
});

export const acceptFriendRequest = catchAsyncHandaler(
  async (req, res, next) => {
    const user = req.user;
    const { reqId, isAccept } = req.body;

    console.log(req.body);

    if (!reqId) {
      return next(new ErrorHandeler("Request Id Not Found !!", 400));
    }

    let isRequest = await RequestSchema.findById(reqId)
      .populate("sender", "name")
      .populate("receiver", "name");

    if (!isRequest) {
      return next(new ErrorHandeler("Request Not Found !!", 400));
    }

    if (isRequest.receiver._id.toString() !== user._id.toString()) {
      return next(new ErrorHandeler("You Can't Accept this Request !!", 400));
    }

    await RequestSchema.findByIdAndUpdate(reqId, {
      status: isAccept ? "accept" : "rejected",
    });

    if (!isAccept) {
      return res.status(200).json({
        success: true,
        message: "Request Rejected Successfull !!",
      });
    }

    let members = [isRequest.sender._id, isRequest.receiver._id];

    if (isAccept) {
      await ChatSchema.create({
        name: `${isRequest.sender.name}-${isRequest.receiver.name}`,
        creator: isRequest.sender._id,
        members: members,
      });
    }

    // Emiting Message Start ======================<<<<<<<<<<<<<<<<
    emitEvent(req, REFETCH_CHATES, members);
    // Emiting Message End ======================<<<<<<<<<<<<<<<<

    return res.status(200).json({
      success: true,
      message: "Request Accect Successfull !!",
    });
  }
);

export const getAllNotification = catchAsyncHandaler(async (req, res, next) => {
  const user = req.user;

  let requests = await RequestSchema.find({
    receiver: user._id,
    status: "pending",
  }).populate("sender", "name avatar bio");

  console.log("requests", requests);

  return res.status(200).json({
    success: true,
    message: "Notification Fetched Successfull !!",
    requests: requests,
  });
});

export const myFriends = catchAsyncHandaler(async (req, res, next) => {
  const { chatId } = req.query;
  const user = req.user;

  const chats = await ChatSchema.find({
    members: user._id,
    group_chat: false,
  }).populate("members", "name avatar");

  const friends = chats?.map(({ members }) => {
    const otherUser = getOtherMembers(members, user._id);

    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await ChatSchema.findById(chatId);

    if (!chat) {
      return next(new ErrorHandeler("Chat Not Found !!", 400));
    }

    // console.log(friends);

    const availableFriends = friends.filter((friend) => {
      // console.log(friend._id, chat.members, !chat.members.includes(friend._id));

      return !chat.members.includes(friend._id);
    });

    res.status(200).json({
      success: true,
      message: "Friend Find Successfull !!",
      friends: availableFriends,
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Friend Find Successfull !!",
      friends: friends,
    });
  }
});
