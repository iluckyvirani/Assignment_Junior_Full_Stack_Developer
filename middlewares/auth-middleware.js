import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'

var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      const { userId } = jwt.verify(token, process.env.JWT_SECRET)

     const user = req.user = await UserModel.findById(userId);

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default checkUserAuth