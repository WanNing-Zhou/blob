import { PureComponent } from "react"
import Banner from "./Banner"
import Tages from "./Tages"
import { connect } from "react-redux"
import { getTags } from "../../actions/home"
import Main from "./Main"

class Home extends PureComponent {
    render() {
        return (
            <div className="home-page">
                {/* 上下结构 */}
                <Banner />

                {/* 下面是左右 */}
                <div className="container page">
                    <div className="row">
                        <Main />

                        {/* biaoq  */}
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>热门标签</p>
                                <Tages tags={this.props.tags} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getTags()
    }
}

const mapState = state => ({
    ...state.home
})

const mapDispatch ={
    getTags
}

export default connect(mapState, mapDispatch)(Home)