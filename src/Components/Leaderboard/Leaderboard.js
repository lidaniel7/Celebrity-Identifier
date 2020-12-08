import React from 'react';
import Table from 'react-bootstrap/Table';
import './Leaderboard.css'


const Leaderboard = ({ leaderboard }) => {
    return (
        <div className="leaderboard">
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th colSpan="3">Current Leaderboard</th>

                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th># of Times Identified</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{leaderboard[0].name}</td>
                        <td>{leaderboard[0].frequency}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{leaderboard[1].name}</td>
                        <td>{leaderboard[1].frequency}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{leaderboard[2].name}</td>
                        <td>{leaderboard[2].frequency}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Leaderboard;