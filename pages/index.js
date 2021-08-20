import {Alignment, Checkbox, Colors, Icon} from "@blueprintjs/core";
import LoadingButton from "../components/loadingButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import Link from "next/link"


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

    return (
        <div className="flex h-screen flex-row md:space-x-2 p-4 justify-center items-center">

            <div className="md:w-1/2 w-full flex justify-center items-center">
                <form onSubmit={handleSubmit(login)}
                      method={'post'}
                      className="md:w-3/5 w-full flex flex-col space-y-3">
                    {errors.email && <span className="form-error">Enter a valid email.</span>}
                    <input {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
                           className="bp3-input bp3-intent-primary bp3-large" placeholder={'Email address'} dir={'auto'}
                           type={'email'}
                    />
                    {errors.password && <span className="form-error">Password is required.</span>}
                    <div className="relative">
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
                        class={"bp3-button bp3-large font-bold focus:outline-none"}
                        text={"Sign In"}
                        showLoad={showLoad}
                    />
                    <button className={"bp3-button bp3-large font-bold focus:outline-none"}
                            style={{color: Colors.WHITE, background: Colors.BLUE1}}
                            type={'button'}>
                        Sign Up
                    </button>
                    <div style={{color: Colors.BLUE1}}
                         className={"md:text-sm text-xs flex justify-between items-center font-semibold"}>
                        {/*<label className="pb3-control pb3-checkbox inline-flex">*/}
                        {/*    <input type="checkbox" />*/}
                        {/*    <span className="ml-1 pb3-control-indicator">Remember me.</span>*/}
                        {/*</label>*/}
                        <Checkbox className={"my-0"}
                                  checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} label="Remember me?"
                                  onChange={onRememberMe}>
                            <Icon className="ml-1" icon={'user'}/>
                        </Checkbox>
                        <Link href={"reset_password"}>
                            <a className={'text-red-400'}>Reset password?</a>
                        </Link>
                    </div>
                </form>
            </div>
            <div className="hidden md:flex md:w-1/2 bg-gray-100 h-screen">

            </div>

        </div>
    )
}
