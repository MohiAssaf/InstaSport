import styles from './DeleteForm.module.css'

const DeleteForm = ({text, closeForm, onDelete}) => {
    return (
        <div className={styles.backBlur}>
            <div className={styles.deleteContainer}> 
                <i className="fa-solid fa-circle-xmark" onClick={closeForm}></i>                   
                <h1 className={styles.delTitle}>Are you sure you want to delete this {text}</h1>
                <div className={styles.btnContainer}> 
                    <button className={styles.yes} onClick={onDelete}>Yes</button>
                    <button className={styles.no} onClick={closeForm}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteForm;