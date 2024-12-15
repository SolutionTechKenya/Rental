// App.js
import React, { useState } from 'react';
import ErrorBox from './ErrorBox';

const App = () => {
    const [visible, setVisible] = useState(true);

    return (
        <div style={{ padding: '20px' }}>
            {visible && (
                <ErrorBox
                    message="An error occurred! Please try again later."
                    type="error"
                    onClose={() => setVisible(false)}
                />
            )}
            <ErrorBox
                message="This is a warning message!"
                type="warning"
            />
            <ErrorBox
                message="Informational message for the user."
                type="info"
            />
            <ErrorBox
                message="Action was successful!"
                type="success"
            />
        </div>
    );
};

export default App;
