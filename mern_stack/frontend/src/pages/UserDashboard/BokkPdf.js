import axios from 'axios';
import React ,{useEffect, useState} from 'react'
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useParams } from 'react-router-dom';
import NavbarUser from '../../components/NavbarUser';
import BookDetails from '../../components/BookDetails';

const BookPdf = () => {
    const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [data,setData]=useState('');
	const [book,setBook] = useState('')
    const Id = useParams()
	console.log('data',book);
    const getBookById = async()=>{
     await axios.get(`http://localhost:5008/admin/list/${Id.id}`)
	.then((response)=>{
		setData(response.data.getBook.bookPdf);
		setBook(response.data.getBook)
	}).catch((err)=>{
		console.log(err);
	})


    }

	useEffect(()=>{
getBookById()
	},[])
	
	const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);

	return (
		<>
		    <NavbarUser/>
		    <div style={{display:"flex",
			   justifyContent:"center",height:"80px",alignItems:"center"}}>
				<SkipPreviousOutlinedIcon color="success" onClick={goToPrevPage}/>
			    <h4>{pageNumber}/ {numPages}</h4>
			    <SkipNextOutlinedIcon  color="success" onClick={goToNextPage}/>
			
				
		    </div>
		    <div >
            <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" ,
		display:"flex",justifyContent:"space-around",alignItems:'flex-start'}}>
			<div>
			<Document
				file={`/Public/books/${data}`}
				onLoadSuccess={onDocumentLoadSuccess}
				
				
			>
				<Page 
				  pageNumber={pageNumber} />
			</Document>
			</div>
			
			<BookDetails book={book}/>
			</div>
		    </div>	
        </>
	);


}

export default BookPdf