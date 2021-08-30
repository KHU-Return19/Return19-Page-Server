const express = require('express')
const router = express.Router()
const { User } = require("../models/user")
const { Study } = require("../models/study")
const { Field } = require('../models/field')
const { auth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    Study.find(function(err, study){
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else{
            console.log(study)
            return res.status(200).json({
                success:true,
                study_list:study
            })
        }
    })
})

router.post('/add', auth, async(req, res) => {
    let { userId } = req.decode
    let new_study = new Study({
        title: req.body.title,
        info: req.body.info,
        address: req.body.address,
        field: req.body.field,
        cheif: userId
    })

    new_study.save(function(err, data){
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            console.log(data)
            return res.status(200).json({
                success:true,
                study:new_study
            })
        }
    })
})

router.post('/addField', async(req, res) => {
    let new_field = new Field({
        field: req.body.field
    })

    new_field.save(function(err, data){
        if (err){
            console.log(err)
            return res.status(500).json({
                success:false,
                err
            })
        }
        else {
            console.log(data)
            return res.status(200).json({
                success:true,
                field:new_field
            })
        }
    })
})

router.delete('/del', auth, async(req, res) => {
    let { userId } = req.decode
    let result = await Study.deleteOne({
        _id: req.body._id,
        cheif: userId
    })
    if (result.ok){
        console.log(reslut)
        return status(200).json({
            success:true
        })
    }
    else{
        return status(500).json({
            success:false,
            err
        })
    }
})

router.put('/modify', auth, async(req, res) => {
    let { userId } = req.decode
    let result = await Study.updateOne({
        _id: req.body._id,
        cheif: userId
    },
    {
        $set: {
            title: req.body.title,
            info: req.body.info,
            field: req.body.field,
            isFin: req.body.isFin,
            address: req.body.address
        }
    })
    if (result.ok){
        console.log(result)
        return status(200).json({
            success:true,
            study:result
        })
    }
    else{
        return res.status(500).json({
            success:false,
            err
        })
    }
})

module.exports = router