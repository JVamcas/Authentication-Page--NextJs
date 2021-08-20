import {Colors, Spinner} from "@blueprintjs/core";

const LoadingButton = (props) => {

    return <div className="flex flex-col space-y-1">
        <button type={'submit'}  className={`${props.class}`} disabled={props.showLoad}
                style={{color:Colors.WHITE,background:Colors.BLUE3}}
        >
            <Spinner className={`${props.showLoad ? '' : 'hidden'} bp3-small`}/>
            <span>{props.text}</span>
        </button>
    </div>

}

export default LoadingButton