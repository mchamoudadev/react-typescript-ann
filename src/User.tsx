
interface UserProps {
    name: string;
    age: number;
    email: string;
}


function User(props: UserProps) {

    const { age, name, email } = props

    return (
        <div>
            <h1>Welcome {name}</h1>
            <p>age : {age}</p>
            <p>email : {email}</p>
        </div>
    )
}


export default User