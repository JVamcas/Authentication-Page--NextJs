import {useForm} from "react-hook-form";
import {useState} from "react";
import Link from 'next/link'
import LoadingButton from "../components/loadingButton";
import AuthLayout from "../components/auth_layout";
import {Colors} from "@blueprintjs/core";

const CreateAccount = props => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm()
    const [showLoad, setShowLoad] = useState(false)

    const createAccount = () => {
        setShowLoad(!showLoad)

    }
    const accountLayout = <div className={"flex flex-col md:w-3/5 w-full"}>
        <label style={{color: Colors.BLUE3}} className={"mb-5 text-center font-bold md:text-2xl text-xl"}>Create account</label>
        <form onSubmit={handleSubmit(createAccount)}
              className={"flex flex-col space-y-3 w-full"}
        >
            <span className={"flex flex-col space-y-0"}>
                {errors.firstName && <span className="form-error">Enter a valid name.</span>}
                <input {...register('firstName', {required: true, minLength: 3})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'First Name'} dir={'auto'}
                       type={'text'}
                />
            </span>

            <span className={"flex flex-col space-y-0"}>
                {errors.lastName && <span className="form-error">Enter a valid surname.</span>}
                <input {...register('lastName', {required: true, minLength: 3})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Last Name'} dir={'auto'}
                       type={'text'}
                />
            </span>

            <span className={"flex flex-col space-y-0"}>
                {errors.email && <span className="form-error">Enter a valid email.</span>}
                <input {...register('email', {required: true, minLength: 3})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Email Address'} dir={'auto'}
                       type={'email'}
                />
            </span>

            <span className={"flex flex-col space-y-0"}>
                {errors.password && <span className="form-error">Password must be 6 characters long.</span>}
                <input {...register('password', {required: true, minLength: 3})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Password'} dir={'auto'}
                       type={'password'}
                />
            </span>

            <span className={"flex flex-col space-y-0"}>
                {errors.confPassword && <span className="form-error">Password must be 6 characters long.</span>}
                <input {...register('confPassword', {required: true, minLength: 3})}
                       className="bp3-input bp3-large bp3-intent-primary" placeholder={'Confirm Password'} dir={'auto'}
                       type={'password'}
                />
                </span>

            <LoadingButton
                class={"bp3-button bp3-large font-bold focus:outline-none"}
                text={"Submit"}
                showLoad={showLoad}
            />
        </form>
        <Link href={"/"}>
            <a
                className={"font-semibold italic md:text-sm text-xs"}
                style={{color: Colors.BLUE3}}
            >Already have an account? Login</a>
        </Link>
    </div>

    return <AuthLayout children={accountLayout}/>
}

export default CreateAccount