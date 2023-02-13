const Tag = require("../models/Tag");

// 获取
module.exports.getTags = async (req, res, next) => {
    try {
        const tagsAll = await Tag.findAll();
        // console.log(tagsAll);
        const tags = [];
        if (tagsAll.length > 0) {
            for (const t of tagsAll) {
                tags.push(t.name);
            }
        }

        // console.log(tags);

        res.status(200).json({
            status: 1,
            message: "获取标签成功",
            data: tags,
        });
    } catch (error) {
        next(error);
    }
};

// 创建
module.exports.createTag = async (req, res, next) => {};