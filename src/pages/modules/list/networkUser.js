import React, {Component} from 'react';
import echarts from 'echarts';
import {DatePicker, Card, WingBlank, SegmentedControl} from 'antd-mobile';
import DatePickerChildren from '../../common/datePickerChildren';
import {actions} from 'mirrorx';
import {formatDate} from '../../../utils/string';
import LogList from '../../common/logList';
import '../style.less';

class NetworkUser extends Component{
  constructor() {
    super();
    const nowTimeStamp = Date.now();
    const now = new Date(nowTimeStamp);
    this.state={
        date: now,
        formatDate: formatDate(now),
        isValidShow: true,
        validData: [
            {macAddress: '11:11:22:33:44', name: 'leon'},
            {macAddress: '11:df:ee:df:Ee', name: 'tsy'},
            {macAddress: '11:df:ee:df:Ef', name: 'kk'},
            {macAddress: '11:df:ee:df:Ef', name: 'test'},
        ],
        invalidData: [
            {macAddress: '12:df:ee:gg:ee', name: ''},
            {macAddress: '12:df:ee:gg:ee', name: 'dior'},
        ]
    }
    this._handleDateChange = this.handleDateChange.bind(this);
    this._handleValidLogChange = this.handleValidLogChange.bind(this);
    this._handleAllowedDataShow = this.handleAllowedDataShow.bind(this);
  }
  componentDidMount(){
    this.loadChart();

  }
  async loadChart() {
    let usernum = {};
    await actions.network.getUserSumList(this.state.formatDate).then((data) => {
        usernum = Object.assign({}, data);
    }).catch((err) => {
        console.log(err);
    });
    this.chartObj = echarts.init(this.chart)
    const option = {
        title: {
            text: '当日用户数量',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            x:25,
            y:45,
            x2:5,
            y2:20,
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: Object.keys(usernum)
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            axisPointer: {
                snap: true
            }
        },
        series: [
            {
                name:'连接次数',
                type:'line',
                smooth: true,
                data: Object.keys(usernum).map(value => usernum[value]),
            }
        ]
    };
    this.chartObj.setOption(option)
  } 
  handleDateChange(date) {
    this.setState({ date, formatDate: formatDate(date)});
    setTimeout(() => {
      this.loadChart(); 
    }, 0);
    
  }

  async handleAllowedDataShow() {
    let result;
    await actions.network.getValidUser(this.state.formatDate).then((data) => {
        result = data;
        console.log('这是', result);
    }).catch((err) => {
        console.log(err);
    });
    return result;

  }

  handleInvalidDataShow() {

  }

  handleValidLogChange() {
      this.setState({
        isValidShow: !this.state.isValidShow
      })
  }

  render() {
    const {isValidShow, validData, invalidData} = this.state;
    return (
        <div className='network-user'>
            <Card>
                <Card.Header
                title="状态总览"
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                extra={
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.date}
                        onChange={this._handleDateChange}
                        >
                        <DatePickerChildren />
                    </DatePicker>
                }
                />
                <Card.Body>
                    <div className="wifi-user-sum-echart" ref={c => this.chart = c}>
                
                    </div>
                </Card.Body>
                <Card.Footer />
            </Card>
            <WingBlank size="lg" className="sc-example">
                <SegmentedControl values={['合法连接', '非法连接']} className='sub-title' onChange={this._handleValidLogChange}/>
                <LogList validData={validData} 
                        invalidData={invalidData} 
                        isValidShow={isValidShow}
                        handleAllowedDataShow={this._handleAllowedDataShow}/>
            </WingBlank>
        </div>
    )
  }
}

export default NetworkUser;