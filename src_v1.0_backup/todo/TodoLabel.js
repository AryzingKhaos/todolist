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
		const {keyValue, title, desc, isComplete, children, isArrange, isHide, isList} = this.props; // 基础信息
		console.log(isHide);
		const {searchTodoByKey, setTodoTitle, setTodoDesc, labelAddChild, labelRemoveThis, labelHideThis, labelListThis, labelSetCompleteValue} = this.props; // function部分
		const {marginLeft, perMarginLeft, fontSize, perFontSize} = this.props; // css样式部分
		// console.log(marginLeft,perMarginLeft, fontSize, perFontSize);
		return (
			<div className={"todolabel" + (isComplete ? ' completed' : '') + (isHide ? ' hide' : '') + (isList ? ' list' : '')}>

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

				{/* <div className="list-this" onClick={() => {labelListThis(keyValue)}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1942">
					<path d="M149.461333 576h213.077334c11.861333 0 21.461333 9.6 21.461333 21.461333v213.077334C384 822.4 374.4 832 362.538667 832H149.461333C137.6 832 128 822.4 128 810.538667v-213.077334C128 585.6 137.6 576 149.461333 576zM85.333333 810.538667A64.106667 64.106667 0 0 0 149.461333 874.666667h213.077334A64.106667 64.106667 0 0 0 426.666667 810.538667v-213.077334A64.106667 64.106667 0 0 0 362.538667 533.333333H149.461333A64.106667 64.106667 0 0 0 85.333333 597.461333v213.077334z m0-384A64.106667 64.106667 0 0 0 149.461333 490.666667h213.077334A64.106667 64.106667 0 0 0 426.666667 426.538667v-213.077334A64.106667 64.106667 0 0 0 362.538667 149.333333H149.461333A64.106667 64.106667 0 0 0 85.333333 213.461333v213.077334zM149.461333 192h213.077334C374.4 192 384 201.6 384 213.461333v213.077334C384 438.4 374.4 448 362.538667 448H149.461333C137.6 448 128 438.4 128 426.538667v-213.077334C128 201.6 137.6 192 149.461333 192z m768.042667 64a21.333333 21.333333 0 0 0 0-42.666667h-426.666667a21.333333 21.333333 0 1 0 0 42.666667h426.666667z m0 384a21.333333 21.333333 0 0 0 0-42.666667h-426.666667a21.333333 21.333333 0 1 0 0 42.666667h426.666667z m0-213.333333a21.333333 21.333333 0 0 0 0-42.666667h-426.666667a21.333333 21.333333 0 1 0 0 42.666667h426.666667z m0 384a21.333333 21.333333 0 0 0 0-42.666667h-426.666667a21.333333 21.333333 0 1 0 0 42.666667h426.666667z" fill="#3D3D3D" p-id="2623"></path>
					</svg>
				</div> */}

				<div className="hide-this" onClick={() => {labelHideThis(keyValue)}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1942">
						<path d="M729.7024 286.47424l-56.12032 80.54784c33.42336 38.68672 53.7344 89.39008 53.7344 144.9472 0 121.34912-96.6912 219.776-215.97184 219.776-28.55936 0-55.80288-5.69856-80.75776-15.95904l-36.56704 52.48c37.00224 8.00768 76.12928 12.59008 116.93056 12.57984 263.34208 0 448.09216-183.12192 448.09216-268.98944C959.0784 450.38592 871.53152 345.3696 729.7024 286.47424zM312.27904 744.00256l50.57024-72.58112c-41.4976-40.05888-67.42016-96.6656-67.42016-159.44704 0-121.34912 96.63488-219.71968 215.91552-219.71968 35.58912 0 69.13024 8.81152 98.73408 24.32512l39.40352-56.55552c-42.91584-10.65984-89.28768-16.8704-138.53184-16.8704-255.7696 0-448.09216 179.8656-448.09216 268.70784C62.85824 575.6928 161.59744 686.57152 312.27904 744.00256zM510.9504 651.59168c75.95008 0 137.4976-62.65856 137.4976-139.9552 0-28.22656-8.23296-54.47168-22.35904-76.44672l-147.95776 212.36736C488.64768 650.16832 499.6352 651.59168 510.9504 651.59168zM510.9504 371.73248c-75.95008 0-137.4976 62.66368-137.4976 139.9552 0 36.05504 13.39904 68.90496 35.39968 93.70112l155.24352-222.8224C547.74272 375.59808 529.79712 371.73248 510.9504 371.73248zM250.148983 937.341824l-29.574161-20.600281 540.951265-776.600084 29.574161 20.600281-540.951265 776.600084Z" p-id="1943"></path>
					</svg>
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

				{/* <div className={"show-this" + (this.state.showContent ? ' rotate' :'')} onClick={() => {this.setState({showContent: !this.state.showContent})}}>
					<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3121">
						<path d="M511.999488 634.683157 132.797004 255.480672l-66.916039 66.916039 446.1175 446.122617 446.1175-446.122617-66.916039-66.916039L511.999488 634.683157zM511.999488 634.683157" p-id="3122"></path>
					</svg>
				</div> */}

				<div className={"show-this " + (isHide ? 'rotate' :'')} onClick={() => {labelListThis(keyValue)}}>
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
											isHide={item.isHide}
											isList={item.isList}

											searchTodoByKey = {searchTodoByKey}
											setTodoTitle = {setTodoTitle}
											setTodoDesc = {setTodoDesc}
											labelAddChild = {labelAddChild}
											labelRemoveThis = {labelRemoveThis}
											labelSetCompleteValue = {labelSetCompleteValue}
											labelHideThis = {labelHideThis}
											labelListThis = {labelListThis}

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

