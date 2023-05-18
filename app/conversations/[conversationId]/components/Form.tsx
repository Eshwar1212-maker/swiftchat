'use client'
import MessageInput from "./MessageInput"
import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane } from "react-icons/hi2"
import { HiPhoto } from "react-icons/hi2"

const Form = () => {
    const {conversationId} = useConversation()
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', {shouldValidate: true})
        axios.post('/api/messages', {
            ...data, 
            conversationId
        })
    }
  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
        <HiPhoto className="text-sky-500" size={30}/>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
        >
            <MessageInput 
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Message..."
            />
            <button 
            type="submit"
            className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
            >
                <HiPaperAirplane
                 className="text-white"
                 size={27}/>
            </button>
        </form>
    </div>
  )
}

export default Form