const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/user");
const Card = require("../models/card");
const Location = require("../models/location");

// 1. 사용자 등록기능 추가
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name, //앞은 User라는 객체의 원래 이름, 뒤는 입력받는 값
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.getUserByUsername(newUser.user, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({
        success: false,
        msg: "동일 아이디가 존재합니다. 다른 username을 사용하세요.",
      });
    } else {
      User.addUser(newUser, (err, user) => {
        console.log(user);
        if (err) {
          res.json({ success: false, msg: "사용자 등록 실패" });
        } else {
          res.json({ success: true, msg: "사용자 등록 성공" });
        }
      });
    }
  });
});

// 2. 사용자 로그인 및 JWT 발급
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let tokenUser = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign({ data: tokenUser }, config.secret, {
          expiresIn: 604800, // 1 week
        });
        res.json({
          success: true,
          token: token,
          userNoPW: tokenUser,
        });
      } else {
        return res.json({
          success: false,
          msg: "Wrong password. 패스워드가 틀립니다.",
        });
      }
    });
  });
});

// 3. Profile 페이지 요청, JWT 인증 이용
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      userNoPW: {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
);

// 4. 명함 등록
router.post("/card", (req, res, next) => {
  let username = req.body.username;
  let update = {
    name: req.body.name,
    tel: req.body.tel,
    zonename: req.body.zonename,
    avaliablezone: req.body.avaliablezone
  };

  Card.getCardByUsername(username, (err, card) => {
    if (err) throw err;
    if (card) {
      Card.updateCard(username, update, (err, card) => {
        return res.json({
          success: true,
          msg: "업체 정보 업데이트 성공",
        });
      });
    } else {
      update.username = req.body.username;
      let newCard = new Card(update);
      Card.addCard(newCard, (err, card) => {
        if (err) throw err;
        if (card) {
          res.json({ success: true, msg: "업체 등록 성공" });
        } else {
          res.json({ success: false, msg: "업체 등록 실패" });
        }
      });
    }
  });
});

// 5. 명함정보 전송
router.post("/myCard", (req, res, next) => {
  Card.getCardByUsername(req.body.username, (err, card) => {
    if (err) throw err;
    if (card) {
      return res.json({
        success: true,
        card: JSON.stringify(card),
      });
    } else {
      res.json({ success: false, msg: "업체 정보가 없습니다" });
    }
  });
});

// 4. list
router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.getAll((err, users) => {
      if (err) throw err;
      res.json(users);
    });
  }
);

router.get(
  "/companylist", async(req, res, next) => {
    await Card.getAll((err, cards) => {
      if (err) throw err;
      res.json(cards);
    });
  }
);

// router.get(
//   "/companylist", (req, res, next) => {
//     Card.getAll((err, cards) => {
//       if (err) throw err;
//       if (cards) {
//         return res.json(cards);
//       } else {
//         res.json({ success: false, msg: "가용 업체가 없습니다." });
//       }
//     });
//   }
// );



// router.post("/location", (req, res, next) => {
//   let username = req.body.username;
//   let updatelocal = {
//     locationname: req.body.locationname,
//     location: req.body.location
//   };

//   Location.getLocationByUsername(username, (err, location) => {
//     if (err) throw err;
//     if (location) {
//       Location.updateLocation(username, updatelocal, (err, card) => {
//         return res.json({
//           success: true,
//           msg: "가용 범위 업데이트 성공"
//         });
//       });
//     } else {
//       updatelocal.username = req.body.username;
//       let newLocation = new Location(updatelocal);
//       Location.addLocationData(newLocation, (err, location) => {
//         if (err) throw err;
//         if (location) {
//           res.json({ success: true, msg: "가용 범위 등록 성공" });
//         } else {
//           res.json({ success: false, msg: "가용 범위 등록 실패" });
//         }
//       });
//     }
//   });

// });




module.exports = router;
