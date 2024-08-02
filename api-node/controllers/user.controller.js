import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user.model.js";
import fs from 'fs'
import path from 'path'

const register = async(req, res)=>{
    try{

        if (req.fileValidationError) {
            if (foto) fs.unlinkSync(path.join('uploads', foto));
            return res.status(400).json({ ok: false, msg: req.fileValidationError });
        }

        const {nombre, email, pass} = req.body
        const foto = req.file ? req.file.filename : null

        if (!nombre || nombre.length < 2 || nombre.length > 30) {
            if (foto) fs.unlinkSync(path.join('uploads', foto));
            return res.status(400).json({
              ok: false,
              msg: 'Invalid Name'
            });
          }

        if(!validator.isEmail(email)){
            if (foto) fs.unlinkSync(path.join('uploads', foto));
            return res.status(500).json({
                ok: false,
                msg: 'Invalid Mail'
            })
        }

        const user = await UserModel.findOneByEmail(email)
        if(user){
            if (foto) fs.unlinkSync(path.join('uploads', foto));
            return res.status(409).json({ ok:false, msg: 'Email already exists' })
        }

        if (!pass || pass.length < 8 || pass.length > 16 || !/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass)) {
            if (foto) fs.unlinkSync(path.join('uploads', foto));
            return res.status(400).json({
              ok: false,
              msg: 'Invalid Password'
            });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(pass, salt)

        await UserModel.create({nombre, email, pass: hashedPassword, foto})

        const token = jwt.sign({
            email : email
        },
            process.env.JWT_SECRET
        )

        return res.status(201).json({ ok: true, msg: token })
    }catch (error){
        if (foto) fs.unlinkSync(path.join('uploads', foto));
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const login = async(req, res)=>{
    try{
        const {email, pass} = req.body

        if(!validator.isEmail(email)){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Mail'
            })
        }

        if (!pass || pass.length < 8 || pass.length > 16 || !/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass)) {
            return res.status(400).json({
              ok: false,
              msg: 'Invalid Password'
            });
        }

        const user = await UserModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }

        const isMatch = await bcryptjs.compare(pass, user.pass)

        if(!isMatch){
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials'
            })
        }

        const token = jwt.sign({
            email : user.email
        },
            process.env.JWT_SECRET
        )

        return res.status(201).json({ ok: true, msg: token })

    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Falta terminarla para que aparezcan todas las recetas que ha creado el propio usuario
const profile = async(req, res) =>{
    try{

        const user = await UserModel.findOneByEmail(req.email)
        return res.json({ ok: true, msg: user })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const UserController = {
    register,
    login,
    profile
}