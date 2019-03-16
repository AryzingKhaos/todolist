import React, { Component } from 'react';

import "./TodoList.css";

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
						// onClick={()=> {this.setState({showContent: !this.state.showContent})}} 
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

					{/* 完成的checkbox */}
					<div className="complete-this">
						<input type="checkbox" name="mycheckbox" id={"mycheckbox"+keyValue} checked={(isComplete ? 'checked' : '')}
							onChange={(e) => {
								// console.log(e.target.checked);
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
						onDoubleClick = {()=> {this.setState({isEditDesc: !this.state.isEditDesc})}}
					>{desc}</div>

					<div className={"descEditBox" + (this.state.isEditDesc ? '' : ' hide')}>

						<div className="editDesc" contentEditable="plaintext-only"
							onBlur = {(event)=> {
								// console.log(event.target.innerHTML);
								this.setState({curEditDesc: event.target.innerHTML});
							}}
							dangerouslySetInnerHTML={{__html: desc}}
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

				<div className="add-child" onClick={() => {labelAddChild(keyValue)}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="315">
						<path d="M921.491325 551.170115 102.508675 551.170115c-21.194718 0-38.389332-17.678638-38.389332-38.885636s17.195637-38.885636 38.389332-38.885636l818.98265 0c21.194718 0 38.390355 17.678638 38.390355 38.885636S942.686043 551.170115 921.491325 551.170115zM512.197498 960.009593c-21.194718 0-38.885636-17.183358-38.885636-38.389332L473.311863 102.636588c0-21.206998 17.690918-38.389332 38.885636-38.389332s38.885636 17.183358 38.885636 38.389332l0 818.98265C551.083134 942.826236 533.392216 960.009593 512.197498 960.009593z" p-id="316"></path>
					</svg>
				</div>

				<div className="remove-this" onClick={() => {labelRemoveThis(keyValue)}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2469">
						<path d="M886.592 841.344L557.248 512l329.36-329.36a32 32 0 1 0-45.264-45.232L512 466.752 182.656 137.408a32 32 0 1 0-45.264 45.232L466.752 512 137.408 841.344a32 32 0 1 0 45.232 45.264L512 557.248l329.36 329.36a32 32 0 1 0 45.232-45.264z" p-id="2470" data-spm-anchor-id="a313x.7781069.1998910418.i0"></path>
					</svg>
				</div>

				<div className={"show-this" + (this.state.showContent ? ' rotate' :'')} onClick={() => {this.setState({showContent: !this.state.showContent})}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121">
						<path d="M511.999488 634.683157 132.797004 255.480672l-66.916039 66.916039 446.1175 446.122617 446.1175-446.122617-66.916039-66.916039L511.999488 634.683157zM511.999488 634.683157" p-id="3122"></path>
					</svg>
				</div>

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

