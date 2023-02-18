import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getArticleBySlug,articleFiledUpdate,articleUnload,articleAddTag,articleRemoveTag,updateArticle} from '../../actions/article'
import Article from "../Article";

class ArticleEdit extends PureComponent {

    componentDidMount() {
        // 获取文章的信息
        const slug = this.props.match.params.slug
        this.props.getArticleBySlug(slug)
    }
    componentWillUnmount() {
        this.props.articleUnload()
    }
    changeBody = (e)=>{
        this.props.articleFiledUpdate("body", e.target.value)
    }

    changeDescription=(e)=>{
        this.props.articleFiledUpdate("description", e.target.value)
    }
    changeTag = (e)=>{
        this.props.articleFiledUpdate('tag',e.target.value)
    }
    changeTitle=(e)=>{
        this.props.articleFiledUpdate('title',e.target.value)
    }
    onSubmit=(e)=>{
        const { title, description, body, tags, slug } = this.props
        e.preventDefault() //阻止默认事件
        this.props.updateArticle({ title, description, body, tags, slug })
    }
    watchEnter=(e)=>{
        if (e.keyCode === 13) {
            e.preventDefault()
            this.props.onAddTag()
        }
    }
    removeTag = (tag)=>{

    }

    state = {};

    render() {
        const { title, description, body, tag, tags } = this.props
        return (
            <div className="editer-page">
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1>编辑文章</h1>
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
                                        value={tag || ""}
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
                                    更新文章
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state=>({
    ...state.article
})

const mapDispatch ={
    getArticleBySlug,articleFiledUpdate,articleUnload,articleAddTag,articleRemoveTag,updateArticle
}

export default connect(mapState,mapDispatch)(ArticleEdit)