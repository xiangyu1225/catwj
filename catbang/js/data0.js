/*
问题：
1、点赞、收藏接口  //貌似不能取消


1、ppt18  点击‘我要支招’ ，调用接口6的参数‘问题id’怎么取
2、接口4 的参数‘Que_ActId’ 是指什么， 怎么取
3、ppt18 专家点评 的专家头像，接口返回里没有


1、ppt10 内容不是接口调用，都是写死的，每一期内容都是固定的，目前只有一期，（大家说卡特模块内容全是固定写死的）
2、ppt8 专家小课堂内容也是固定的，不通过接口，同上
3、ppt8 如果用户已经登录，直接弹出成功窗口，如果没有登录，则直接登录
4、ppt11 数据不是从接口获取，内容是固定的（属于大家说卡特模块，内容是固定的，根据素材内容显示）
5、ppt12 点击查看详情到ppt13，弹窗里的信息是 接口3还是接口4(接口3)
6、ppt14  下面的‘我要支招’ 是哪个接口(调用接口6)
7、个人中心主页 的数据 哪个接口

大家说卡特模块下面的专家小课堂，用户有力量内容都是固定的，不通过接口





*/


//1、产品系列:
var test_productList = {"1":"小型挖掘机","2":"中型挖掘机","3":"大型挖掘机","4":"轮式挖掘机","5":"装载机","6":"Cat智能","7":"二手机","8":"工装"};


// 2、问题列表/搜索
var test_questionList={"List":[{"Que_Id":1,"Que_Title":"问题","Que_Content":"","Que_ProductType":"1","Que_Type":"4","Que_PraiseNum":0,"Que_CommentNum":0,"Que_CollectNum":0,"Que_ShareNum":0,"Que_CreateTime":"\/Date(1429591736000)\/","Que_Wonderful":"N","Que_CreateUserId":0,"Que_CreateUserName":"","Que_ExpertId":"1","Que_ExpertName":"","Que_IsExpertReply":null,"Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201350)\/"},{"Que_Id":2,"Que_Title":"问题","Que_Content":"","Que_ProductType":"1","Que_Type":"4","Que_PraiseNum":0,"Que_CommentNum":0,"Que_CollectNum":0,"Que_ShareNum":0,"Que_CreateTime":"\/Date(1429591736000)\/","Que_Wonderful":"N","Que_CreateUserId":0,"Que_CreateUserName":"","Que_ExpertId":"2","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201350)\/"},{"Que_Id":3,"Que_Title":"问题1","Que_Content":"","Que_ProductType":"1,5","Que_Type":"1,2,3","Que_PraiseNum":0,"Que_CommentNum":5,"Que_CollectNum":0,"Que_ShareNum":0,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"N","Que_CreateUserId":18934,"Que_CreateUserName":"werw","Que_ExpertId":"3","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201350)\/"},{"Que_Id":4,"Que_Title":"活动问题1","Que_Content":null,"Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":11,"Que_CommentNum":11,"Que_CollectNum":11,"Que_ShareNum":11,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"N","Que_CreateUserId":null,"Que_CreateUserName":"名字","Que_ExpertId":"4","Que_ExpertName":null,"Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201350)\/"},{"Que_Id":6,"Que_Title":"活动问题2","Que_Content":"","Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":1,"Que_CommentNum":11,"Que_CollectNum":31,"Que_ShareNum":11,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"Y","Que_CreateUserId":18934,"Que_CreateUserName":"SDF","Que_ExpertId":"1","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201000)\/"},{"Que_Id":7,"Que_Title":"活动问题3","Que_Content":"","Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":1,"Que_CommentNum":11,"Que_CollectNum":1,"Que_ShareNum":1,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"Y","Que_CreateUserId":18934,"Que_CreateUserName":"ADSFA","Que_ExpertId":"3","Que_ExpertName":"","Que_IsExpertReply":"Y","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201000)\/"},{"Que_Id":8,"Que_Title":"活动问题4","Que_Content":null,"Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":11,"Que_CommentNum":234,"Que_CollectNum":11,"Que_ShareNum":11,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"Y","Que_CreateUserId":18934,"Que_CreateUserName":"ASF","Que_ExpertId":"4","Que_ExpertName":null,"Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201350)\/"},{"Que_Id":9,"Que_Title":"活动问题5","Que_Content":"","Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":9,"Que_CommentNum":58,"Que_CollectNum":6,"Que_ShareNum":3,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"N","Que_CreateUserId":18934,"Que_CreateUserName":"ADS","Que_ExpertId":"1","Que_ExpertName":"","Que_IsExpertReply":"Y","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201000)\/"},{"Que_Id":10,"Que_Title":"活动问题6","Que_Content":"","Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":24,"Que_CommentNum":125,"Que_CollectNum":12,"Que_ShareNum":123,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"N","Que_CreateUserId":18934,"Que_CreateUserName":"AFADS","Que_ExpertId":"2","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201000)\/"},{"Que_Id":11,"Que_Title":"活动问题2","Que_Content":"","Que_ProductType":"1","Que_Type":"2","Que_PraiseNum":3,"Que_CommentNum":13,"Que_CollectNum":2,"Que_ShareNum":11,"Que_CreateTime":"\/Date(1429593194000)\/","Que_Wonderful":"Y","Que_CreateUserId":18934,"Que_CreateUserName":"SDF","Que_ExpertId":"2","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1431073201000)\/"}],"Count":151}

// 3、问题详情
var test_questionDetail= {"List":[{"Ans_Id":214,"Ans_Content":"卡卡卡卡卡卡卡卡卡","Ans_QuestionId":10,"Ans_CreateTime":"1431579024000","Ans_CreateUserId":18583,"Ans_CreataUserName":"思思","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431579024000)\/","Ans_ReplyAnsId":0},{"Ans_Id":215,"Ans_Content":"由于 336D2 XE 使用标准液压部件，与336D2相比没有太多差异，维修人员只需极少的专业培训就能维修这些机器。大多数常规保养项目","Ans_QuestionId":10,"Ans_CreateTime":"1434038400000","Ans_CreateUserId":18583,"Ans_CreataUserName":"思思22","Ans_IsAnonymous":"N","Ans_IsExpert":"Y","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431579034000)\/","Ans_ReplyAnsId":0},{"Ans_Id":225,"Ans_Content":"卡卡卡卡卡卡卡卡卡","Ans_QuestionId":10,"Ans_CreateTime":"1434038400000","Ans_CreateUserId":18583,"Ans_CreataUserName":"思思22","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431579034000)\/","Ans_ReplyAnsId":0}],"Count":3};

//4、发言:专家点评/全部回答
var test_activitiesDetail={"List":[{"Ans_Id":133,"Ans_Content":"满足客户需要是Cat产品的恒久追求，好比这款Cat 336D2 XE液压混合动力挖掘机，既高效又省油，充分考虑到了中国用户的工况特点和使用需求。","Ans_QuestionId":92,"Ans_CreateTime":"\/Date(1431414923000)\/","Ans_CreateUserId":1,"Ans_CreataUserName":"测试","Ans_IsAnonymous":"N","Ans_IsExpert":"Y","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431414923000)\/","Ans_ReplyAnsId":0},{"Ans_Id":143,"Ans_Content":"与我们的标准的336D2相比，同等产量下XE机型的燃油消耗大幅度降低，这对降低拥有和运营成本起到极大作用，所以，平日里长时间进行挖沟或卡车装载的客户会更适合使用336D2 XE。在柴油价格不断上涨的今天，连续多年使用XE机器时，累计节省的油耗成本会非常可观。","Ans_QuestionId":92,"Ans_CreateTime":"\/Date(1431421508000)\/","Ans_CreateUserId":2,"Ans_CreataUserName":"测试_J","Ans_IsAnonymous":"N","Ans_IsExpert":"Y","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431421508000)\/","Ans_ReplyAnsId":141},{"Ans_Id":164,"Ans_Content":"这个问题提的很对！","Ans_QuestionId":92,"Ans_CreateTime":"\/Date(1431432450000)\/","Ans_CreateUserId":3,"Ans_CreataUserName":"怪蜀黍","Ans_IsAnonymous":"N","Ans_IsExpert":"Y","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431432450000)\/","Ans_ReplyAnsId":0}],"Count":3};


//7、用户登录
var test_catbangLogon= {"ErrorCode":0     //         0代表成功   -1代表失败
,"ErrorDetail":"成功"        //错误信息
,"userType":0             //用户身份：0 新用户，1 卡特挖机用户，2 CLUB用户 ，3卡特帮用户
,"userid":18687             //用户ID
,"userName":"某某"         //用户姓名
,"phone":"13700000302"}   //用户手机


// 11、我提交的问题
var test_myQuestionList={"List":[{"Que_Id":130,"Que_Title":"大放送等待发送大森蝶 ","Que_Content":"","Que_ProductType":"1,4","Que_Type":"","Que_PraiseNum":0,"Que_CommentNum":0,"Que_CollectNum":0,"Que_ShareNum":0,"Que_CreateTime":"\/Date(1432205894000)\/","Que_Wonderful":"N","Que_CreateUserId":18687,"Que_CreateUserName":"XX","Que_ExpertId":"0","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1432205895160)\/"},{"Que_Id":131,"Que_Title":"阿迪发送单打法山东山东","Que_Content":"","Que_ProductType":"2,4,6","Que_Type":"","Que_PraiseNum":0,"Que_CommentNum":0,"Que_CollectNum":0,"Que_ShareNum":0,"Que_CreateTime":"\/Date(1432205954000)\/","Que_Wonderful":"N","Que_CreateUserId":18687,"Que_CreateUserName":"XX","Que_ExpertId":"0","Que_ExpertName":"","Que_IsExpertReply":"N","Que_ActId":0,"Que_IsDelete":"N","Que_DeleteTime":"\/Date(1432205955000)\/"}],"Count":2}


//12、我提交的评论
var test_myCommentList={"List":[{"Ans_Id":48,"Ans_Content":"在干什么","Ans_QuestionId":68,"Ans_CreateTime":"\/Date(1431171599000)\/","Ans_CreateUserId":18687,"Ans_CreataUserName":"李响","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431171599000)\/","Ans_ReplyAnsId":0},{"Ans_Id":49,"Ans_Content":"叮叮当当","Ans_QuestionId":68,"Ans_CreateTime":"\/Date(1431244004000)\/","Ans_CreateUserId":18687,"Ans_CreataUserName":"李响","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431244004000)\/","Ans_ReplyAnsId":0}],"Count":2}



      //13、我收到的评论
var test_myCommentGetList = {"List":[{"Ans_Id":114,"Ans_Content":"aaa","Ans_QuestionId":35,"Ans_CreateTime":"\/Date(1431399293000)\/","Ans_CreateUserId":18978,"Ans_CreataUserName":"test angela","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431399293000)\/","Ans_ReplyAnsId":50},{"Ans_Id":127,"Ans_Content":"评论评论","Ans_QuestionId":83,"Ans_CreateTime":"\/Date(1431401982000)\/","Ans_CreateUserId":18986,"Ans_CreataUserName":"测试_J","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431401982000)\/","Ans_ReplyAnsId":0},{"Ans_Id":129,"Ans_Content":"啊啊啊啊啊","Ans_QuestionId":83,"Ans_CreateTime":"\/Date(1431403013000)\/","Ans_CreateUserId":18986,"Ans_CreataUserName":"测试_J","Ans_IsAnonymous":"N","Ans_IsExpert":"N","Ans_IsDelete":"N","Ans_DeleteTime":"\/Date(1431403013000)\/","Ans_ReplyAnsId":90}],"Count":3}


      // 14、我收藏的问题
var test_myCollectionList={"List":[{"Id":83,"UserId":18687,"IsExpert":"N","LogType":"3","Que_Id":63,"CreateTime":"\/Date(1431056933000)\/","IsDelete":"N","DeleteTime":"\/Date(1431056933000)\/"},{"Id":85,"UserId":18687,"IsExpert":"N","LogType":"3","Que_Id":35,"CreateTime":"\/Date(1431260297000)\/","IsDelete":"N","DeleteTime":"\/Date(1431260297000)\/"},{"Id":457,"UserId":18687,"IsExpert":"N","LogType":"3","Que_Id":17,"CreateTime":"\/Date(1432118549000)\/","IsDelete":"N","DeleteTime":"\/Date(1432118549000)\/"}],"Count":3}


      //16、省列表
var test_getProvince={"List":[{"A_Id":1,"A_ParentId":0,"A_Name":"安徽","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":20,"A_ParentId":0,"A_Name":"澳门","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":22,"A_ParentId":0,"A_Name":"北京","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":24,"A_ParentId":0,"A_Name":"重庆","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":26,"A_ParentId":0,"A_Name":"福建","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":38,"A_ParentId":0,"A_Name":"甘肃","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":54,"A_ParentId":0,"A_Name":"广东","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":77,"A_ParentId":0,"A_Name":"广西","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":93,"A_ParentId":0,"A_Name":"贵州","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":104,"A_ParentId":0,"A_Name":"海南","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":108,"A_ParentId":0,"A_Name":"河北","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":121,"A_ParentId":0,"A_Name":"河南","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":141,"A_ParentId":0,"A_Name":"黑龙江","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":156,"A_ParentId":0,"A_Name":"湖北","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":175,"A_ParentId":0,"A_Name":"湖南","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":191,"A_ParentId":0,"A_Name":"吉林","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":204,"A_ParentId":0,"A_Name":"江苏","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":225,"A_ParentId":0,"A_Name":"江西","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":238,"A_ParentId":0,"A_Name":"辽宁","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":254,"A_ParentId":0,"A_Name":"内蒙古","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":268,"A_ParentId":0,"A_Name":"宁夏","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":275,"A_ParentId":0,"A_Name":"青海","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":285,"A_ParentId":0,"A_Name":"山东","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":304,"A_ParentId":0,"A_Name":"山西","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":317,"A_ParentId":0,"A_Name":"陕西","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":330,"A_ParentId":0,"A_Name":"上海","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":332,"A_ParentId":0,"A_Name":"四川","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":355,"A_ParentId":0,"A_Name":"台湾","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":364,"A_ParentId":0,"A_Name":"天津","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":366,"A_ParentId":0,"A_Name":"西藏","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":375,"A_ParentId":0,"A_Name":"香港","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":377,"A_ParentId":0,"A_Name":"新疆","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":397,"A_ParentId":0,"A_Name":"云南","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":415,"A_ParentId":0,"A_Name":"浙江","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"}],"Count":34}



      //17、市列表
var test_getCity = {"List":[{"A_Id":2,"A_ParentId":1,"A_Name":"安庆","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":3,"A_ParentId":1,"A_Name":"蚌埠","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":4,"A_ParentId":1,"A_Name":"亳州","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":5,"A_ParentId":1,"A_Name":"巢湖","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":6,"A_ParentId":1,"A_Name":"池州","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":7,"A_ParentId":1,"A_Name":"滁州","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":8,"A_ParentId":1,"A_Name":"阜阳","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":9,"A_ParentId":1,"A_Name":"合肥","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":10,"A_ParentId":1,"A_Name":"淮北","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":11,"A_ParentId":1,"A_Name":"淮南","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":12,"A_ParentId":1,"A_Name":"黄山","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":13,"A_ParentId":1,"A_Name":"六安","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":14,"A_ParentId":1,"A_Name":"马鞍山","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":15,"A_ParentId":1,"A_Name":"铜陵","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":16,"A_ParentId":1,"A_Name":"芜湖","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":17,"A_ParentId":1,"A_Name":"宿州","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":18,"A_ParentId":1,"A_Name":"宣城","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"},{"A_Id":19,"A_ParentId":1,"A_Name":"其他","A_Sort":0,"A_AddTime":"\/Date(1357278842290)\/"}],"Count":18}






/*php
  $.ajax({
      url: "reservations.php?v=1",
      type: "POST",
      // dataType: 'json',
      data: {
        'username': $('#username').val(),
        'nickname': $('#nickname').val(),
        'mobile': $('#mobile').val(),
        'carType': $('#carType').val(),
        'buyDate': $('#buyDate').val(),
        'province': $('#province').val(),
        'city': $('#city').val(),
        'isAgree': $('#agree')[0].checked ? 1 : 0
      },
      success: function(r) {
        submit_complete = true;

        console.log(r);
        alert($.parseJSON(r).msg)
      },
      error: function() {
        submit_complete = true;
      }
    });

*/









