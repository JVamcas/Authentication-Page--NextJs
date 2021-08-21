import {Alignment, Checkbox, Colors, Icon} from "@blueprintjs/core";
import LoadingButton from "../components/loadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import Link from "next/link"
import AuthLayout from "../components/auth_layout";


export default function Home() {
    const [showPassword, setShowPassword] = useState(false)
    const {register, reset, handleSubmit, formState: {errors}} = useForm()
    const [showLoad, setShowLoad] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    const onRememberMe = () => {

    }

    const login = () => {
        setShowLoad(!showLoad)
    }
    const loginLayout = <form onSubmit={handleSubmit(login)}
                              method={'post'}
                              className="md:w-3/5 w-full flex flex-col">
        <span className={"flex flex-col space-y-0 mb-3"}>
        {errors.email && <span className="form-error">Enter a valid email.</span>}
            <input {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                   className="bp3-input bp3-intent-primary bp3-large" placeholder={'Email address'} dir={'auto'}
                   type={'email'}
            />
        </span>

        {errors.password && <span className="form-error">Password is required.</span>}
        <div className="relative flex flex-col my-0 bg-yellow-500">
            <input
                {...register('password', {required: true})}
                className="relative w-full bp3-input bp3-intent-primary bp3-large"
                placeholder={'Password'}
                dir={'auto'}
                type={showPassword ? 'text' : 'password'}/>
            <span className={"absolute right-2 top-2 bottom-2"}
                  onClick={() => setShowPassword(!showPassword)}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye}
                                           className="text-gray-600 md:fa-2x fa-1x cursor-pointer"
                          />
                        </span>
        </div>
        <LoadingButton
            class={"bp3-button bp3-large font-bold focus:outline-none my-3"}
            text={"Login"}
            showLoad={showLoad}
        />
        <Link
            href={"/create_account"}>
            <a
                className={"bp3-button bp3-large font-bold focus:outline-none mb-3"}
                style={{color: Colors.WHITE, background: Colors.BLUE1}}
                type={'button'}>
                Create new account
            </a>
        </Link>
        <div style={{color: Colors.BLUE1}}
             className={"md:text-sm text-xs flex justify-between items-center font-semibold"}>
            <Checkbox className={"my-0"}
                      checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} label="Remember me?"
                      onChange={onRememberMe}>
                <Icon className="ml-1" icon={'user'}/>
            </Checkbox>
            <Link href={"/forgot_password"}>
                <a className={'text-red-400'}>Forgot password?</a>
            </Link>
        </div>
    </form>

return <AuthLayout children={loginLayout}/>

}
