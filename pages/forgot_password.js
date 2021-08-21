import {useForm} from "react-hook-form";
import {useState} from "react";
import {Colors} from "@blueprintjs/core";
import LoadingButton from "../components/loadingButton";
import AuthLayout from "../components/auth_layout";

const ForgotPassword = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm()
    const [showLoad, setShowLoad] = useState(false)
    const [errorTxt, setErrorTxt] = useState(null)
    const [resetLinkSent, setResetLinkSent] = useState(false)


    const sendResetLink = async (data) => {
        setShowLoad(!showLoad)

        const req = await fetch("/api/send_password_reset_link",
            {
                'email': data.email,
                headers: {'Content-type': 'application/json'},
                method: 'post'
            }
        )

        const results = await req.json()
        if (results.send) {
            setResetLinkSent(true)
            setErrorTxt(null)
        }
        reset()
    }

    const formLayout = <div className={"flex flex-col md:w-3/5 w-full"}>
        <label style={{color: Colors.BLUE3}}
               className={"mb-5 text-center font-bold md:text-2xl text-xl"}>Forgot Password?</label>
        <form onSubmit={handleSubmit(sendResetLink)}
              className={"flex flex-col space-y-3 w-full"}
              hidden={resetLinkSent}
              method={'post'}
        >
            <span className={"flex flex-col space-y-0"}>
                {errors.email && <span className="form-error">Enter a valid email address.</span>}
                <input {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Email address'} dir={'auto'}
                       type={'email'}
                />
            </span>
            <LoadingButton
                class={"bp3-button bp3-large font-bold focus:outline-none mb-5"}
                text={"Submit"}
                showLoad={showLoad}
            />
            <p className={`text-red-500 md:text-sm text-xs`} hidden={!errorTxt}>{errorTxt}</p>
        </form>
        <blockquote
            style={{color: Colors.BLUE1}}
            className={"text-xs md:text-sm"}
            hidden={!resetLinkSent}
        >
            <p>A password reset link has been sent to your email address. Click on the link to reset your password.</p>
        </blockquote>
    </div>

    return <AuthLayout children={formLayout}/>

}

export default ForgotPassword