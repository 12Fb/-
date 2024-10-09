const replaceMent =(str,res=1) =>{
  if(res){

    str = str.replaceAll('¬','!');
    str = str.replaceAll('∧','&')
    str = str.replaceAll('∨', '|');
    str = str.replaceAll('→', '>');
    str = str.replaceAll('↔', '<')
  }
  else {
    str = str.replaceAll('!','¬');
    str = str.replaceAll('&','∧')
    str = str.replaceAll('|','∨' );
    str = str.replaceAll('>','→');
    str = str.replaceAll('<','↔')
  }
    return str;
}
export default replaceMent