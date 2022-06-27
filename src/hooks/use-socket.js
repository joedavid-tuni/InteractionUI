import { useContext } from "react"
import WSContext from "../store/ws-context"


const useSocket = () => {
    const socket = useContext(WSContext);

    return socket;
}

export default useSocket;