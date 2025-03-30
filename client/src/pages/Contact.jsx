import { useNavigate } from 'react-router';
import { useCreateInboxMess } from '../api/inboxApi';
import '../assets/css/form.css'
import SubmitButton from '../components/SubmitButton/SubmitButton';
import { toast } from 'react-toastify';
import { useUser } from '../api/authApi';

const Contact = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const {createMessage} = useCreateInboxMess();

    const submitAction = async (formData) => {
        const data = Object.fromEntries(formData);
        try {
            await createMessage(data)
            toast.success('Request sent! We’ll send a reply to your email soon.')
            navigate('/profile')
        } catch (error) {
            toast.error('Request failed! Try again later.')
        }
        
    }

    return (
        <div className="page">
            <div className="mx-auto max-w-4xl w-full bg-white p-15 shadow-md rounded">
                <h1 className="form-title">Contact us</h1>
                
                <form action={submitAction} className="form">
                    <div className='flex justify-between space-x-10'>
                        <div className="form-group w-full">
                            <label htmlFor="name" className="label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                placeholder="Enter your Full Name"
                                defaultValue={user?.name}
                            />
                        </div>
                        <div className="form-group w-full">
                            <label htmlFor="email" className="label">
                                Email
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                className="input-field"
                                placeholder="Enter your email"
                                autoComplete="email"
                                defaultValue={user?.email}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="label">
                            Username
                        </label>
                        <input 
                            type="username" 
                            name="username" 
                            className="input-field"
                            placeholder="Enter the username of the profile"
                            defaultValue={user?.username}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label 
                        htmlFor="message"
                        className="label"
                        >
                            Message
                        </label>
                        <textarea
                        name="message"
                        placeholder="Tell us what is the issue you are encountering"
                        className="input-field desc"
                        required
                        >
                        </textarea> 
                    </div>
        
                    
                    <SubmitButton btnText="Send Message" /> 
                </form>
            </div>
        </div>

    );
};

export default Contact;