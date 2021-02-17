const handleProfile = (req,res,pg)=>{
	const {id} = req.params;

	pg.select('*').from('users').where({id:id}).then(user=>{
		if(user.length){
			res.json(user[0])	
		}else{
			res.status(404).json('not found')
		}
	}).catch((err)=>{res.status(400).json('error finding user')});
}



module.exports = 
{
	handleProfile:handleProfile
}