import './ExpensesFilter.css';
import Card from '../UI/Card';

const ExpensesFilter = () => {
    return (
        <Card className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select>
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                </select>
            </div>
        </Card>
    );
};

export default ExpensesFilter;