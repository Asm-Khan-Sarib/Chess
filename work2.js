const piece=['rook','knight','bishop','queen','king','bishop','knight','rook']
let bord=[]
let promotion_list=[]
let w_promotion = 'url("image/pieces/w_queen.png")'
let b_promotion = 'url("image/pieces/b_queen.png")'
let previous_button_id = 'reset'
let previous_button = document.getElementById(`${previous_button_id}`)
let previous_color = 'b'
let castle_w_long = true
let castle_w_short = true
let castle_b_long = true
let castle_b_short = true

//set all bord and promotion list piece
const reset_all_pieces = () =>{
    for(let i=0; i<bord.length; i++){
        if(i<8){
            if(i<4){
                promotion_list[i].style.backgroundImage = `url("image/pieces/b_${piece[i]}.png")`
                promotion_list[i+4].style.backgroundImage = `url("image/pieces/w_${piece[i]}.png")`
            }
            bord[i].style.backgroundImage = `url("image/pieces/b_${piece[i]}.png")`
        }
        else if (i<16){
            bord[i].style.backgroundImage = `url("image/pieces/b_pawn.png")`
        }
        else if(i>47 && 56>i){
            bord[i].style.backgroundImage = `url("image/pieces/w_pawn.png")`
        }
        else if(i>55){
            bord[i].style.backgroundImage = `url("image/pieces/w_${piece[i-56]}.png")`
        }
        else{
            bord[i].style.backgroundImage = ''
        }
    }
    previous_button.style.backgroundImage = ''
}
//remove border
function remove_border(){
    bord.forEach(button=>{
        button.style.border = ''
    })
}
//remove border from promotional button
function remove_promotion_list_border(c){
    promotion_list.forEach(button => {
        if(button.style.backgroundImage[18]===c){
            button.style.border = ''
        }
    })
}
//post move
function post_move(button){
    remove_border()
    button.style.backgroundImage = previous_button.style.backgroundImage
    previous_button.style.backgroundImage = ''
    previous_button_id = 'reset'
}
//possible move
function possible_move(button){
    let x=[]
    const button_position = bord.findIndex(x=>{
        return x === button
    })
    if(button.style.backgroundImage.includes('king')){
        x=king_move(button_position)
    }
    if(button.style.backgroundImage.includes('queen')){
        let x1=bishop_move(button_position)
        let x2=rook_move(button_position)
        x=[...x1, ...x2]
    }
    if(button.style.backgroundImage.includes('bishop')){
        x=bishop_move(button_position)
    }
    if(button.style.backgroundImage.includes('knight')){
        x=Knight_moves(button_position)
    }
    if(button.style.backgroundImage.includes('rook')){
        x=rook_move(button_position)
    }
    if(button.style.backgroundImage.includes('pawn')){
        x=pawn_move(button_position)
    }
    x.forEach(Element=>{
        bord[Element].style.border='3px solid rgba(172, 65, 51, 0.9)'
    })
}
//king normal move
function king_move(temp_position){
    let color = bord[temp_position].style.backgroundImage[18]
    let row = Math.floor(temp_position / 8)
    let col = temp_position % 8
    let moves = []
    // Calculate all possible moves from the current position
    let potentialMoves = [[row, col -1],[row, col +1],[row +1, col +1],[row +1, col],[row + 1, col -1],[row -1, col +1],[row - 1, col],[row -1, col -1]];
    // Filter out moves that are off the board
    moves = potentialMoves.filter(move => {
        let [r, c] = move
        return r >= 0 && r <= 7 && c >= 0 && c <= 7;
    });
    // Convert row and column values back to square indices
    moves = moves.map(move => move[0] * 8 + move[1])
    // Filter same color piece
    moves= moves.filter(move =>{
        return bord[move].style.backgroundImage[18]!==color
    })
    return moves
}
//knight
function Knight_moves(temp_position) {
    let color = bord[temp_position].style.backgroundImage[18]
    let row = Math.floor(temp_position / 8)
    let col = temp_position % 8
    let moves = []
    // Calculate all possible moves from the current position
    let potentialMoves = [[row - 2, col - 1],[row - 2, col + 1],[row - 1, col - 2],[row - 1, col + 2],
        [row + 1, col - 2],[row + 1, col + 2],[row + 2, col - 1],[row + 2, col + 1]];
    // Filter out moves that are off the board
    moves = potentialMoves.filter(move => {
      let [r, c] = move
      return r >= 0 && r <= 7 && c >= 0 && c <= 7;
    });
    // Convert row and column values back to square indices
    moves = moves.map(move => move[0] * 8 + move[1])
    // Filter same color piece
    moves= moves.filter(move =>{
        return bord[move].style.backgroundImage[18]!==color
    })
    return moves
}
//rook
function rook_move(temp_position){
    let color = bord[temp_position].style.backgroundImage[18]
    let row = Math.floor(temp_position / 8)
    let col = temp_position % 8
    let moves = []
    for (let i = 1; i < 8; i++){
        //right
        if (col + i <= 7) {
            let move = (row) * 8 + (col + i)
            if(bord[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== bord[move].style.backgroundImage[18]){
                moves.push(move)
                break
            }
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++){
        //left
        if (col - i >= 0) {
            let move = (row) * 8 + (col - i)
            if(bord[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== bord[move].style.backgroundImage[18]){
                moves.push(move)
                break
            }
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++){
        // Up
        if (row - i >= 0) {
            let move = (row - i) * 8 + (col)
            if(bord[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== bord[move].style.backgroundImage[18]){
                moves.push(move)
                break
            }
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++) {
        // Down
        if (row + i <= 7) {
            let move = (row + i) * 8 + (col);
            if (bord[move].style.backgroundImage == '') {
                moves.push(move)
            } 
            else if (color !== bord[move].style.backgroundImage[18]) {
                moves.push(move)
                break
            } 
            else {
                break
            }
        }
    }
    return moves
}
// bishop
function bishop_move(temp_position){
    let color = bord[temp_position].style.backgroundImage[18]
    let row = Math.floor(temp_position / 8)
    let col = temp_position % 8
    let moves = []
    for (let i = 1; i < 8; i++){
        // Up-right diagonal
        if (row - i >= 0 && col + i <= 7) {
            let move = (row - i) * 8 + (col + i)
            if(bord[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== bord[move].style.backgroundImage[18]){
                moves.push(move)
                break
            }
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++){
        // Up-left diagonal
        if (row - i >= 0 && col - i >= 0) {
            let move = (row - i) * 8 + (col - i)
            if(bord[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== bord[move].style.backgroundImage[18]){
                moves.push(move)
                break
            }
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++){
        // Down-right diagonal
        if (row + i <= 7 && col + i <= 7) {
            let move = (row + i) * 8 + (col + i)
            if (bord[move].style.backgroundImage == '') {
                moves.push(move)
            } 
            else if (color !== bord[move].style.backgroundImage[18]) {
                moves.push(move)
                break
            } 
            else {
                break
            }
        }
    }
    for (let i = 1; i < 8; i++) {
        // Down-left diagonal
        if (row + i <= 7 && col - i >= 0) {
            let move = (row + i) * 8 + (col - i)
            if (bord[move].style.backgroundImage == '') {
                moves.push(move)
            } 
            else if (color !== bord[move].style.backgroundImage[18]) {
                moves.push(move)
                break
            } 
            else {
                break
            }
        }
    }
    return moves
}
// pawm move
function pawn_move(temp_position){
    let color = bord[temp_position].style.backgroundImage[18]
    let moves = []
    if(color==='b'){
        if(bord[temp_position+8].style.backgroundImage===''){
            moves.push(temp_position+8)
        }
        if((Math.trunc(temp_position/8) === 1) && (bord[temp_position+8].style.backgroundImage==='') && (bord[temp_position+16].style.backgroundImage==='')){
            moves.push(temp_position+16)
        }
        //capture
        if((temp_position%8) === 0){
            if(bord[temp_position+9].style.backgroundImage[18]==='w'){
                moves.push(temp_position+9)
            }   
        }
        else if(((temp_position+1) %8) === 0){
            if(bord[temp_position+7].style.backgroundImage[18]==='w'){
                moves.push(temp_position+7)
            }
        }
        else{
            if(bord[temp_position+7].style.backgroundImage[18]==='w'){
                moves.push(temp_position+7)
            }
            if(bord[temp_position+9].style.backgroundImage[18]==='w'){
                moves.push(temp_position+9)
            }
        }
    }
    if(color==='w'){
        if(bord[temp_position-8].style.backgroundImage===''){
            moves.push(temp_position-8)
        }
        if((Math.trunc(temp_position/8) === 6) && (bord[temp_position-8].style.backgroundImage==='') && (bord[temp_position-16].style.backgroundImage==='')){
            moves.push(temp_position-16)
        }
        //capture
        if((temp_position%8) === 0){
            if(bord[temp_position-7].style.backgroundImage[18]==='b'){
                moves.push(temp_position-7)
            }   
        }
        else if(((temp_position+1) %8) === 0){
            if(bord[temp_position-9].style.backgroundImage[18]==='b'){
                moves.push(temp_position-9)
            }
        }
        else{
            if(bord[temp_position-7].style.backgroundImage[18]==='b'){
                moves.push(temp_position-7)
            }
            if(bord[temp_position-9].style.backgroundImage[18]==='b'){
                moves.push(temp_position-9)
            }
        }
    }
    return moves
}
//white castle
function white_castle(button){
    //white short castle
    if(previous_button.style.backgroundImage.includes('w_king') && (previous_button.id==='a61') && 
    (button.id==='a63') && (bord[61].style.backgroundImage === '') && (bord[62].style.backgroundImage === '') &&
    (bord[63].style.backgroundImage.includes('w_rook')) && (castle_w_short==true)){
        bord[63].style.backgroundImage =''
        bord[61].style.backgroundImage = 'url("image/pieces/w_rook.png")'
        castle_w_short = false
        castle_w_long = false
        post_move(button)
    }
    //white long castle
    if(previous_button.style.backgroundImage.includes('w_king') && (previous_button.id==='a61') && 
    (button.id==='a59') && (bord[57].style.backgroundImage === '') && (bord[58].style.backgroundImage === '') &&
    (bord[59].style.backgroundImage === '') && (bord[56].style.backgroundImage.includes('w_rook')) && (castle_w_long==true)){
        bord[56].style.backgroundImage =''
        bord[59].style.backgroundImage = 'url("image/pieces/w_rook.png")'
        castle_w_short = false
        castle_w_long = false
        post_move(button)
    }
}
//black castle
function black_castle(button){
    //black short castle
    if(previous_button.style.backgroundImage.includes('b_king') && (previous_button.id==='a5') && 
    (button.id==='a7') && (bord[5].style.backgroundImage === '') && (bord[6].style.backgroundImage === '') &&
    (bord[7].style.backgroundImage.includes('b_rook')) && (castle_b_short==true)){
        bord[7].style.backgroundImage =''
        bord[5].style.backgroundImage = 'url("image/pieces/b_rook.png")'
        castle_b_short = false
        castle_b_long = false
        post_move(button)
    }
    //black long castle
    if(previous_button.style.backgroundImage.includes('b_king') && (previous_button.id==='a5') && 
    (button.id==='a3') && (bord[1].style.backgroundImage === '') && (bord[2].style.backgroundImage === '') &&
    (bord[3].style.backgroundImage === '') && (bord[0].style.backgroundImage.includes('b_rook')) && (castle_b_long==true)){
        bord[0].style.backgroundImage =''
        bord[3].style.backgroundImage = 'url("image/pieces/b_rook.png")'
        castle_b_short = false
        castle_b_long = false
        post_move(button)
    }
}
document.addEventListener("DOMContentLoaded", () =>{
    const text1 = document.getElementById('text1')
    const text2 = document.getElementById('text2')
    const text3 = document.getElementById('text3')
    //get bord and promotion bord
    for (let i = 1; i < 65; i++) {
        if(i<9){
            promotion_list.push(document.getElementById(`p${i}`))
        }
        bord.push(document.getElementById(`a${i}`))
    }
    //reset everything
    document.getElementById("reset").addEventListener("click", () =>{
        document.getElementById("reset").innerHTML='<h2>Reset</h2>'
        reset_all_pieces ()
        remove_border()
        remove_promotion_list_border('w')
        remove_promotion_list_border('b')
        w_promotion = 'url("image/pieces/w_queen.png")'
        b_promotion = 'url("image/pieces/b_queen.png")'
        previous_button_id = 'reset'
        previous_color = 'b'
        castle_w_long = true
        castle_w_short = true
        castle_b_long = true
        castle_b_short = true
        
    })
    
    //promotion list
    promotion_list.forEach(button =>{
        button.addEventListener("click", () =>{
            // white
            if(button.style.backgroundImage[18]==='w'){
                remove_promotion_list_border('w')
                w_promotion = button.style.backgroundImage
                button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
            }
            //black
            if(button.style.backgroundImage[18]==='b'){
                remove_promotion_list_border('b')
                b_promotion = button.style.backgroundImage
                button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
            }
            text1.innerHTML=w_promotion
            text2.innerHTML=b_promotion
        })
    })

    bord.forEach(button => {
        button.addEventListener("click", () => {
            previous_button = document.getElementById(`${previous_button_id}`) 
            //not capturing same color piece
            if((button.style.backgroundImage != '') && (previous_button.style.backgroundImage != '') && (button.style.backgroundImage[18]==previous_button.style.backgroundImage[18])){
                remove_border()
                button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
                previous_button_id = button.id
                if(button.style.backgroundImage!=''){
                    possible_move(button)
                }
            }
            // not move same color twoice
            else if (button.style.backgroundImage[18]!=previous_color){
                //select a piece
                if(previous_button.style.backgroundImage==''){
                    remove_border()
                    button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
                    if(button.style.backgroundImage !=''){
                        previous_button_id = button.id
                        previous_color=button.style.backgroundImage[18]
                        if(button.style.backgroundImage!=''){
                            possible_move(button)
                        }
                    }
                }
                //place a piece
                else if( ! button.style.backgroundImage.includes('king') ){
                    // 
                    const button_position = bord.findIndex(x=>{
                        return x === button
                    })
                    const temp_position = bord.findIndex(x=>{
                        return x === previous_button
                    })
                    let x=[]
                    if(previous_button.style.backgroundImage.includes('king')){
                        x=king_move(temp_position)
                        if(x.includes(button_position)){
                            if(previous_button.style.backgroundImage[18] === 'w'){
                                castle_w_long = false
                                castle_w_short = false
                            }
                            if(previous_button.style.backgroundImage[18] === 'b'){
                                castle_b_long = false
                                castle_b_short = false
                            }
                            post_move(button)
                        }
                        //castle
                        else{
                            white_castle(button)
                            black_castle(button)
                        }
                    }
                    if(previous_button.style.backgroundImage.includes('queen')){
                        let x1=bishop_move(temp_position)
                        let x2=rook_move(temp_position)
                        x=[...x1, ...x2]
                        if(x.includes(button_position)){
                            post_move(button)
                        }
                    }
                    if(previous_button.style.backgroundImage.includes('bishop')){
                        x=bishop_move(temp_position)
                        if(x.includes(button_position)){
                            post_move(button)
                        }
                    }
                    if(previous_button.style.backgroundImage.includes('knight')){
                        x=Knight_moves(temp_position)
                        if(x.includes(button_position)){
                            post_move(button)
                        }
                    }
                    if(previous_button.style.backgroundImage.includes('rook')){
                        x=rook_move(temp_position)
                        if(x.includes(button_position)){
                            if(temp_position==0){
                                castle_b_long = false
                            }
                            if(temp_position==7){
                                castle_b_short = false
                            }
                            if(temp_position==56){
                                castle_w_long = false
                            }
                            if(temp_position==63){
                                castle_w_short = false
                            }
                            post_move(button)
                        }
                    }
                    if(previous_button.style.backgroundImage.includes('pawn')){
                        x=pawn_move(temp_position)
                        if(x.includes(button_position)){
                            post_move(button)
                        }
                    }
                    text1.innerHTML=x
                }
            }
               
        })
    })
})