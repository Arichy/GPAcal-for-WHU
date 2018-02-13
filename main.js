function calculate(courseArr){
	var gpSum = 0;//所有课程的绩点*学分的和
	var creditSum = 0;//所有课程学分的和

	var score;
	var credit;
	var gp;
	var course;

	var credit0 = 0;
	var credit1 = 0;
	var credit2 = 0;
	var credit3 = 0;
	var gpa = 0;

	for(var i=0;i<courseArr.length;i++){
		course = courseArr[i];
		score = parseFloat(course.score);
		credit = parseFloat(course.credit);

		if(score>=90){
			gp = 4.0;
		}
		else if(score>=85){
			gp = 3.7;
		}
		else if(score>=82){
			gp = 3.3;
		}
		else if(score>=78){
			gp = 3.0;
		}
		else if(score>=75){
			gp = 2.7;
		}
		else if(score>=72){
			gp = 2.3;
		}
		else if(score>=68){
			gp = 2.0;
		}
		else if(score>=64){
			gp = 1.5;
		}
		else if(score>=60){
			gp = 1.0;
		}
		else{
			gp = 0.0;
		}

		switch(course.type){
			case 0: credit0 += credit; break;
			case 1: credit1 += credit; break;
			case 2: credit2 += credit; break;
			case 3: credit3 += credit; break;
		}

		creditSum += credit;
		gpSum += (credit*gp);
	}

	gpSum = parseFloat(gpSum.toFixed(4));
	gpa = gpSum/creditSum;

	return {
		'公共选修':credit0,
		'公共必修':credit1,
		'专业选修':credit2,
		'专业必修':credit3,
		'总学分':creditSum,
		'GPA':gpa.toFixed(3)
	};
}

var typeMap = {
	'公共选修':0,
	'公共必修':1,
	'专业选修':2,
	'专业必修':3
};

var btn = document.getElementById('btn3');

var frame1,frame2,frame3;
var j=0;
btn.addEventListener('click',function(){

		frame1 = document.getElementById('page_iframe').contentWindow;
		frame3 = document.getElementById('bar_iframe').contentWindow;
		
		var timer = setInterval(function (){

			if(frame1.document.getElementById('iframe0')){//frame1已经加载完毕，此时可以获取成绩表格的frame2
				frame2 = frame1.document.getElementById('iframe0').contentWindow;
				
				if(frame2.document.getElementsByClassName('listTable')[0] && frame3.document.getElementById('listContent')){

					var listContent = frame3.document.getElementById('listContent');
					var	resultTable = listContent.getElementsByClassName('listTable')[0];

					var title = listContent.getElementsByClassName('listTitle')[0].innerHTML;
					
					if(title=='学分和GPA统计'){
						j++;
						if(j>=8){
							j=0;
							clearInterval(timer);
							
							var gradeTable = frame2.document.getElementsByClassName('listTable')[0];

							var trs;
							var tds;
							var i;

							trs = gradeTable.getElementsByTagName('tr');

							var courseArr = [];

							for(i=0;i<trs.length;i++){
								tds = trs[i].getElementsByTagName('td');
								
								if(tds[9] && tds[9].innerHTML){
									var course = {};
									course.name = tds[1].innerHTML;
									course.credit = tds[3].innerHTML;
									course.score = tds[9].innerHTML;
									course.type = typeMap[tds[2].innerHTML];

									courseArr.push(course);
								}
							}
							var result = calculate(courseArr);

							
							trs = resultTable.getElementsByTagName('tr');
							console.log(trs);
							
							for(i=1;i<trs.length;i++){
								tds = trs[i].getElementsByTagName('td');
								var key = tds[0].innerHTML;
								if(result[key]!=null){
									tds[1].innerHTML = result[key];
								}
							}
						} 
					}
						
				
					//按钮部分
					/*var wraptr = document.createElement('tr');
					var wraptd = document.createElement('td');
					var calBtn = document.createElement('button');

					wraptd.setAttribute('colspan',2);

					calBtn.innerHTML = '计算学分和GPA';
					calBtn.onclick = function(e){
						e.preventDefault();
						e.returnValue = false;
					};
					var css = "padding:4px;margin:3px;border:1px solid black;border-radius:5px;cursor:pointer";
					calBtn.setAttribute('style',css);

					wraptr.appendChild(wraptd);
					wraptd.appendChild(calBtn);

					document.getElementById('bar_iframe').contentWindow.document.getElementById('listContent').getElementsByTagName('tbody')[0].appendChild(wraptr);*/
				}
			}
		},20);
	
});