import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {articleFiledUpdate, articleUnload, articleAddTag, articleRemoveTag, createArticle} from '../../actions/article'

class ArticleNew extends PureComponent {

    componentWillUnmount() {
        this.props.articleUnload()
    }

    //状态: 主体同步
    changeBody = (e) => {
        this.props.articleFiledUpdate("body", e.target.value);
    }

    //状态: 描述同步
    changeDescription = (e) => {
        this.props.articleFiledUpdate("description", e.target.value)
    }

    //状态: 标签同步
    changeTag = (e) => {
        // console.log('标签改变了',e.target.value)
        this.props.articleFiledUpdate("tag", e.target.value)

    }

    //状态 标题同步
    changeTitle = (e) => {
        // console.log('标题改变了',e.target.value)
        this.props.articleFiledUpdate("title", e.target.value)
        // console.log(this.props)

    }

    //提交
    onSubmit = (e) => {
        const {title, description, body, tags} = this.props
        // console.log('提交中的props',this.props)
        e.preventDefault() //阻止默认事件
        this.props. createArticle({title,description,body,tags})
    }

    //监听Enter
    watchEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()//阻止默认事件
            this.props.articleAddTag()

        }
    }

    //删除表标签
    removeTag = (tag) => {
        return (e) => {
            e.preventDefault()//阻止默认事件
            this.props.articleRemoveTag(tag)
        }
    }

    state = {};

    render() {
        const {title, description, body, tag, tags} = this.props
        return (
            <div className="editer-page">
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1>创建文章</h1>
                            <form>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章标题'
                                        value={title || ""}
                                        onChange={this.changeTitle}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='文章描述'
                                        value={description || ""}
                                        onChange={this.changeDescription}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <textarea
                                        className='form-control form-control-lg'
                                        rows={12}
                                        placeholder='用markdown编辑'
                                        value={body || ""}
                                        onChange={this.changeBody}
                                    />
                                </fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        className='form-control form-control-lg'
                                        type="text"
                                        placeholder='请输入标签'
                                        value= {tag || ""}
                                        onChange={this.changeTag}
                                        onKeyUp={this.watchEnter}
                                    />
                                </fieldset>
                                {
                                    tags.map(tag => {
                                        return (
                                            <span className="tag-default tag-pill"
                                                  key={tag}>
                                                {tag}
                                                <i className="iconfont icon-denglong"
                                                   onClick={this.removeTag(tag)}></i>
                                            </span>
                                        )
                                    })
                                }
                                <button
                                    className='btn btn-lg btn-primary pull-xs-right'
                                    type='button'
                                    onClick={this.onSubmit}
                                >
                                    发布文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state => ({
    ...state.article
})

const mapDispatch = {
    articleFiledUpdate,
    articleUnload,
    articleAddTag,
    articleRemoveTag,
    createArticle
}

export default connect(mapState, mapDispatch)(ArticleNew)