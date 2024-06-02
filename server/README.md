For Error Use This =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
next(new ErrorHandeler("Message", statusCode))

For Try Catch Use This =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
catchAsyncHandaler(async (req, res, next) => {
  
    // Your Code

  res.status(200).json({
    success: true,
    message: "Success Done",
  });
});

In Response User This Format =====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
res.status(200).json({
    success: true,
    message: "Success Done",
});

Thanks