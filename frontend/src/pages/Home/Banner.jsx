import { memo } from "react";

const Banner = (props) => {
    return (
        <div className="banner">
            <div className="container">
                <h1>Blog-v1</h1>
                <p>
                    js-recat-node-mongodb全栈开发
                </p>
            </div>
        </div>)
}

export default memo(Banner)