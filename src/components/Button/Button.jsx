import s from "./Button.module.css"
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
    <button className={s.Button} type="button" onClick={onClick}>
        Load more
    </button>
);
    

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};