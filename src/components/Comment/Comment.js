function Comment() {
    return (
        <div className='post-coment'>
            <div >
                <div>
                    <img className='profile-img-sm' src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000' />
                </div>
                <div>
                    <div>
                        <div><label>John Smith</label></div>
                        <div><label>Online</label></div>
                        <div><label>12:00 PM 01/01/22</label></div>
                    </div>
                </div>
            </div>
            <div>
                <p>Nice Pic!!</p>
            </div>
        </div>
    );
}

export default Comment