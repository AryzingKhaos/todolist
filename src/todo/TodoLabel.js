import React, { Component } from 'react';

import "./todolist.css";

class TodoLabel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showContent: false,
			isEditTitle: false,
			curEditTitle: '',
			isEditDesc: false,
			curEditDesc: '',
		};
	}

	componentDidMount() {
		
	}

	render() {
		const {keyValue, title, desc, isComplete, children, isArrange} = this.props; // 基础信息
		const {searchTodoByKey, setTodoTitle, setTodoDesc, labelAddChild, labelRemoveThis, labelSetCompleteValue} = this.props; // function部分
		const {marginLeft, perMarginLeft, fontSize, perFontSize} = this.props; // css样式部分
		// console.log(marginLeft,perMarginLeft, fontSize, perFontSize);
		return (
			<div className={"todolabel" + (isComplete ? ' completed' : '')}>

				{/* title部分 */}
				<div className="title" alt="双击编辑" style={{'marginLeft':marginLeft, 'fontSize': fontSize, 'width':'calc( 80% - '+marginLeft+'px )'}}>
					<div className="titleText" 
						onClick={()=> {this.setState({showContent: !this.state.showContent})}} 
						onDoubleClick = {()=> {this.setState({isEditTitle: !this.state.isEditTitle})}}
					>{title}</div>
					<div className={"titleEditBox" + (this.state.isEditTitle ? '' : ' hide')}>

						<div className="editTitle" contentEditable="plaintext-only"
							onBlur = {(event)=> {
								// console.log(event.target.innerHTML);
								this.setState({curEditTitle: event.target.innerHTML});
							}}
							dangerouslySetInnerHTML={{__html: title}}
						></div>

						<div className="divact editTitleBtn editTitleCancelBtn"
							onClick={()=> {this.setState({isEditTitle: !this.state.isEditTitle})}}
						>取消</div>

						<div className="divact editTitleBtn editTitleConfirmBtn"
							onClick={()=> {
								setTodoTitle(keyValue, this.state.curEditTitle);
								this.setState({isEditTitle: !this.state.isEditTitle})
							}}
						>确定</div>
					</div>

					{/* 完成按钮 */}
					<div className="complete-this">
						<input type="checkbox" name="mycheckbox" id={"mycheckbox"+keyValue} checked={(isComplete ? 'checked' : '')}
							onChange={(e) => {
								console.log(e.target.checked);
								if(e.target.checked){
									labelSetCompleteValue(keyValue, true);
								}else{
									labelSetCompleteValue(keyValue, false);
								}
							}}
						/>
						<label htmlFor={"mycheckbox"+keyValue}><i className="checkbox-dot"></i></label>
					</div>
				</div>

				{/* desc部分 */}
				<div className={"desc"+(this.state.showContent ? ' show' :'')} style={{'marginLeft':marginLeft,'width':'calc( 80% - '+marginLeft+'px )'}}>
					<div className="descText" 
						onClick={()=> {this.setState({showContent: !this.state.showContent})}} 
						onDoubleClick = {()=> {this.setState({isEditDesc: !this.state.isEditDesc})}}
					>{desc}</div>

					<div className={"descEditBox" + (this.state.isEditDesc ? '' : ' hide')}>

						<div className="editDesc" contentEditable="plaintext-only"
							onBlur = {(event)=> {
								// console.log(event.target.innerHTML);
								this.setState({curEditDesc: event.target.innerHTML});
							}}
							dangerouslySetInnerHTML={{__html: title}}
						></div>

						<div className="divact editDescBtn editDescCancelBtn"
							onClick={()=> {this.setState({isEditDesc: !this.state.isEditDesc})}}
						>取消</div>

						<div className="divact editDescBtn editDescConfirmBtn"
							onClick={()=> {
								setTodoDesc(keyValue, this.state.curEditDesc);
								this.setState({isEditDesc: !this.state.isEditDesc})
							}}
						>确定</div>
						</div>
					</div>

				<div className="add-child" onClick={() => {labelAddChild(keyValue)}}>+</div>

				<div className="remove-this" onClick={() => {labelRemoveThis(keyValue)}}>-</div>

				<div className="children">
					{
						function() {
							// console.log(children && children.length);
							if(children && children.length){
								let copyChildren = children.concat([]);
								if(isArrange){
									copyChildren.sort(function(a,b){
										return a.isComplete - b.isComplete;
									})
								}
								return copyChildren.map((item, index) => {
									return (
										<TodoLabel 
											key={item.key}
											keyValue={item.key}
											title={item.title}
											desc={item.desc}
											isComplete={item.isComplete}
											children={item.children}
											isArrange={isArrange}

											searchTodoByKey = {searchTodoByKey}
											setTodoTitle = {setTodoTitle}
											setTodoDesc = {setTodoDesc}
											labelAddChild = {labelAddChild}
											labelRemoveThis = {labelRemoveThis}
											labelSetCompleteValue = {labelSetCompleteValue}

											marginLeft={marginLeft+perMarginLeft}
											fontSize={fontSize-perFontSize}
											perMarginLeft={perMarginLeft}
											perFontSize={perFontSize}
										/>
									)
								})
							}
							return null;
						}()
					}
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 	}
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 	}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TodoLsit);
export default TodoLabel;

