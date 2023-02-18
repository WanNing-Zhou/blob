import { memo } from "react";
import { connect } from "react-redux"
import { syncPage, syncTag, syncTab, onTabClick } from "../../actions/home"

const Tags = memo(props => {
    const { tags } = props
    if (tags) {
        return <div className="tag-list">
            {
                tags.map(tag => {
                    return <button
                        type="button"
                        className="tag-default tag-pill"
                        key={tag}
                        onClick={
                            () => {
                                props.syncTag(tag)
                                props.syncPage(1)
                                props.syncTab(null)
                                props.onTabClick()
                            }
                        }
                    >
                        {tag}
                    </button>
                })
            }
        </div>
    } else {
        return <div>加载标签。。。</div>
    }
})
const mapDispatch = {
    syncPage,
    syncTab,
    syncTag,
    onTabClick
}
export default connect(null, mapDispatch)(Tags)