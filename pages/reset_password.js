import {useForm} from "react-hook-form";
import {useState} from "react";
import {Colors} from "@blueprintjs/core";
import LoadingButton from "../components/loadingButton";
import AuthLayout from "../components/auth_layout";

const ResetPassword = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm()
    const [showLoad, setShowLoad] = useState(false)
    const [errorTxt, setErrorTxt] = useState(null)
    const [resetSuccess, setResetSuccess] = useState(false)

    const sendResetLink = async (data) => {
        setShowLoad(!showLoad)

        const req = await fetch("/api/reset_password",
            {
                body: data,
                headers: {'Content-type': 'application/json'},
                method: 'post'
            }
        )

        const results = await req.json()
        if (results.success) {
            setResetSuccess(true)
            setErrorTxt(null)
        }
        reset()
    }

    const resetLayout = <div className={"flex flex-col md:w-3/5 w-full"}>
        <label style={{color: Colors.BLUE3}}
               className={"mb-5 text-center font-bold md:text-2xl text-xl"}>Reset Password</label>
        <form onSubmit={handleSubmit(sendResetLink)}
              className={"flex flex-col space-y-3 w-full"}
              hidden={resetSuccess}
              method={'post'}
        >
            <span className={"flex flex-col space-y-0"}>
                {errors.email && <span className="form-error"></span>}
                <input {...register('password', {required: true, pattern: /^\S+@\S+$/i})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'New password'} dir={'auto'}
                       type={'password'}
                />
            </span>
            <span className={"flex flex-col space-y-0"}>
                {errors.email && <span className="form-error"></span>}
                <input {...register('confPassword', {required: true, pattern: /^\S+@\S+$/i})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Confirm password'} dir={'auto'}
                       type={'password'}
                />
            </span>
            <LoadingButton
                class={"bp3-button bp3-large font-bold focus:outline-none"}
                text={"Submit"}
                showLoad={showLoad}
            />
            <p className={`text-red-500 md:text-sm text-xs`} hidden={!errorTxt}>{errorTxt}</p>
        </form>
        <blockquote
            style={{color: Colors.BLUE1}}
            className={"text-xs md:text-sm"}
            hidden={!resetSuccess}
        >
            <p>Password successfully reset.</p>
        </blockquote>
    </div>

    return <AuthLayout children={resetLayout}/>

}

export default ResetPassword