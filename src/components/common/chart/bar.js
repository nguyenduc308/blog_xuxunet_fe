import { formatCurrency } from "../../../helpers/currency";

const BarChart = ({ data }) => {
    const unit = (price) => {
        return price >= 1000 ? 'tỷ' : 'triệu'
    }

    data = data || [];
    const maxCol = Math.max(...data);

    const percents = data.map((col) => {
        return col / maxCol * 100;
    });

    return (
        <div className="bar-chart-wrapper">
            <div className="bar-chart" style={{color: 'rgb(122, 169, 60)'}}>
                {percents.map((col, i) => {
                return <div key={i} className="chart-line" style={{height: (col) + '%', width: `calc(${100/percents.length}% - 11px)`}}>
                    {/* {percents.length < 20 && <span className="num">{formatCurrency(data[i], '.')} {unit}</span>} */}
                    <div className="desc">
                        <div>Tháng thứ <strong>{i + 1}</strong></div>
                        <div>Số tiền <strong>{formatCurrency(data[i])} {unit(data[i])}</strong></div>
                    </div>
                </div>
                })}
            </div>
            {/* <div className="bar-chart-bottom">
                {percents.map((col, i) => {
                    return <div key={i} className="bar-chart-row-item">
                        {percents.length < 20 && <span className="num">{i + 1}</span>}
                    </div>
                })} 
            </div> */}
        </div>
    )
}

export default BarChart;