import Card from 'react-bootstrap/Card';
import MyNavbar from '../components/navbar';

const DefaultLayout = (props) => {
    const children = props.children;

    return (
        <>
            <MyNavbar />

            <div style={{ padding: 20 }}>
                <Card>
                    {children}
                </Card>
            </div>
        </>
    );
}

export default DefaultLayout