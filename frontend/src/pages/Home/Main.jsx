import { memo } from "react";
import { PureComponent } from "react";
import { connect } from "react-redux"
import { syncPage, syncTab, syncTag, onTabClick, homeUnmount } from "../../actions/home"
import Articles from "../Articles";

let AllTab = memo(props => {
    // 显示全部
    let { currentUser, tab, onTabClick } = props
    // console.log(currentUser);
    let handClick = e => {
        e.preventDefault()
        onTabClick("all", 1)
    }

    if (!currentUser) {
        return null
    } else {
        return (
            <li className="nav-item">
                <button type="button"
                        className={tab === "all" ? "nav-link active" : "nav-link"}
                        onClick={handClick}
                >
                    全部
                </button>
            </li>
        )
    }
})

let TagTab = memo(props => {
    // 通过标签筛选
    let { tag } = props
    // console.log(currentUser);
    if (!tag) {
        return null
    } else {
        return (
            <li className="nav-item">
                <button type="button" className={"nav-link active"}>
                    {tag}
                </button>
            </li>
        )
    }
})
class Main extends PureComponent {

    handClick = (tab, page) => {
        this.props.syncTag(null)
        this.props.syncPage(page)
        this.props.syncTab(tab)
        this.props.onTabClick()
    }

    handPageClick = (pageNum) => {
        this.props.syncPage(pageNum)
        this.props.onTabClick()
    }

    render() {

        return (
            <div className="col-md-9">
                <div className="feet-toggle">
                    <ul className="nav nav-pills outline-active">
                        {/* 全部文章 */}
                        <AllTab currentUser={this.props.currentUser} tab={this.props.tab}
                                onTabClick={this.handClick}
                        />
                        {/* 具体的文章--点击右侧的标签请求来的 */}
                        <TagTab tag={this.props.tag}></TagTab>
                    </ul>
                </div>
                <Articles
                    articles={this.props.articles}
                    count={this.props.count}
                    currentPage={this.props.currentPage}
                    isShowPage={true}
                    onPageClick={this.handPageClick}
                />
            </div>
        )
    }
    componentWillUnmount() {
        // console.log("卸载");
        this.props.homeUnmount()
    }

    componentDidMount() {
        if (this.props.currentUser) {
            // console.log("加载");
            this.props.syncPage(1)
            this.props.syncTab("all")
            this.props.onTabClick()
        }
    }
}


const mapState = state => ({
    ...state.home,
    ...state.user.login
})

const mapDispatch = {
    syncPage, syncTab, syncTag, onTabClick, homeUnmount
}

export default connect(mapState, mapDispatch)(Main)