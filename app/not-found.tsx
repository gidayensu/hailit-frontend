import ErrorComponent from "@/components/Shared/ErrorComponent"
export default function NotFound () {
    return (
        <ErrorComponent errorCode={404} errorMessage="Page Not Found" url="/"/>
    )
}