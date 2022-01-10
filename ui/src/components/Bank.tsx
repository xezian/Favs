import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import UseAxios from '../hooks/useAxios';
import BankCard from './BankCard';
import { IFavInfo } from './Favs';

const Bank = () => {
    const {bankId} = useParams();
    const [bank, setBank] = useState<IFavInfo|null>(null);
    const [faved, setFaved] = useState(true);
    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState('');
    const {response, loading, error, fetchData} = UseAxios();

    useEffect(()=> {
        if(faved) {
            fetchData({
                url: `/bank/${bankId}`,
            })
        }
    },[faved])

    useEffect(() => {
        if(response?.data[0]) {
            setBank(response.data[0])
            setNotes(response.data[0].COMMENTS ? response.data[0].COMMENTS : '')
        }
    }, [response])

    const handleSaveComment = () => {
        fetchData({
            url: `/bank/${bankId}`,
            method: 'put',
            params: {
                COMMENTS: notes
            }
        })
        setEdit(false)
    }

    const handleRefreshFaves = () => {
        setFaved(!faved)
    }

    return (
        <div className="bankDeets">
            <Link to="/">
                <span className="clickEmoji">
                    ⬅️
                </span>
            </Link>
            <div className="bankDeetsCard">
                {
                    loading ? <>loading...</> : error ? <>{error}</> :
                    <>
                        { bank &&
                            <BankCard bank={bank} bold={true} faved={faved} refreshFavs={handleRefreshFaves}>
                                <div className="bankDeets">
                                    <p><strong>UNINUM:</strong> {bank.UNINUM}</p>
                                    <p><strong>NAME:</strong> {bank.NAME}</p>
                                    <p><strong>WEBADDR:</strong> <a href={bank.WEBADDR} target="_blank" rel="noreferrer">{bank.WEBADDR}</a></p>
                                    <p><strong>ZIP:</strong> {bank.ZIP}</p>
                                    <p><strong>CITY:</strong> {bank.CITY}</p>
                                    <p><strong>STNAME:</strong> {bank.STNAME}</p>
                                    <p><strong>ASSET:</strong> {bank.ASSET}</p>
                                    <p><strong>BKCLASS:</strong> {bank.BKCLASS}</p>
                                    <p><strong>ACTIVE:</strong> {bank.ACTIVE}</p>
                                    <p><strong>NAMEHCR:</strong> {bank.NAMEHCR}</p>
                                    <p><strong>MDI_STATUS_CODE:</strong> {bank.MDI_STATUS_CODE}</p>
                                    <p><strong>MDI_STATUS_DESC:</strong> {bank.MDI_STATUS_DESC}</p>
                                    <p><strong>OFFICES:</strong> {bank.OFFICES}</p>
                                    <p className="notesRow">
                                        <strong>NOTES:</strong>
                                        {
                                            faved ? (
                                                <>
                                                    {edit ? (
                                                        <>
                                                            <textarea onChange={(e)=>setNotes(e.target.value)} value={notes} className="editNotes">
                                                            </textarea>
                                                            <span onClick={handleSaveComment} className="clickEmoji">✅</span>
                                                            <span onClick={()=>setEdit(false)} className="clickEmoji">❌</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span onClick={()=>setEdit(true)} className="clickEmoji">✍️</span>
                                                            {bank.COMMENTS}
                                                        </>
                                                    )}
                                                </>
                                            ) : null
                                        }
                                    </p>
                                </div>
                            </BankCard>
                        }
                    </>
                }
            </div>
            
        </div>
    )
}

export default Bank;
