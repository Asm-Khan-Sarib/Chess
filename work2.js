const piece=['rook','knight','bishop','queen','king','bishop','knight','rook']
let bord=[]
let promotion_list=[]
//autopromotion
let w_promotion = 'url("image/pieces/w_queen.png")'
let b_promotion = 'url("image/pieces/b_queen.png")'
//selected button's info
let previous_button_id = 'reset'
let previous_button = document.getElementById(`${previous_button_id}`)
let previous_color = 'b'
//castle status
let castle_w_long = true
let castle_w_short = true
let castle_b_long = true
let castle_b_short = true
//detecting check
let check_w = false
let check_b = false
//old button's info
let previous_button2_id = 'z'
let previous_color2 = 'b'
let old_piece=''
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
    document.getElementById("reset").style.backgroundImage = ''
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
//reverse move when check is not blocked
function move_reverse(button){
    previous_button.style.backgroundImage = button.style.backgroundImage
    button.style.backgroundImage = old_piece
    previous_button_id = previous_button2_id
    previous_color = previous_color2
}
//post move
function post_move(button){
    remove_border()
    //save info for reverse move
    previous_button2_id = previous_button_id
    previous_color2 = previous_color
    old_piece = button.style.backgroundImage
    //change bord
    button.style.backgroundImage = previous_button.style.backgroundImage
    previous_button.style.backgroundImage = ''
    previous_button_id = 'reset'
    //check
    find_check('w')
    find_check('b')
    //reverse move
    if(check_b && (button.style.backgroundImage[18]==='b')){
        move_reverse(button)
    }
    else if(check_w && (button.style.backgroundImage[18]==='w')){
        move_reverse(button)
    }
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
        x=Knight_move(button_position)
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
function Knight_move(temp_position) {
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
//check pawn promotionn
function check_promotion(button_position){
    remove_border()
    //promotig white
    if((previous_button.style.backgroundImage.includes('w_pawn')) && (Math.trunc(button_position/8) === 0)){
        old_piece = bord[button_position].style.backgroundImage
        previous_button2_id = previous_button_id
        previous_color2 = previous_color

        bord[button_position].style.backgroundImage = w_promotion
        previous_button.style.backgroundImage = ''
        previous_button_id = 'reset'
        ////after white making the move check if white king is in check or not. if yes, reverse promotion, if no, chek if black king is in check or not.
        find_check('b')
        find_check('w')
        if(check_w){
            previous_button.style.backgroundImage = `url("image/pieces/w_pawn.png")`
            bord[button_position].style.backgroundImage = old_piece
            previous_button_id = previous_button2_id
            previous_color = previous_color2
        }
    }
    //promoting black
    else if((previous_button.style.backgroundImage.includes('b_pawn')) && (Math.trunc(button_position/8) === 7)){
        old_piece = bord[button_position].style.backgroundImage
        previous_button2_id = previous_button_id
        previous_color2 = previous_color

        bord[button_position].style.backgroundImage = b_promotion
        previous_button.style.backgroundImage = ''
        previous_button_id = 'reset'
        //after black making the move check if black king is in check or not. if yes, reverse promotion, if no, chek if white king is in check or not.
        find_check('w')
        find_check('b')
        if(check_b){
            previous_button.style.backgroundImage = `url("image/pieces/b_pawn.png")`
            bord[button_position].style.backgroundImage = old_piece
            previous_button_id = previous_button2_id
            previous_color = previous_color2
        }
    }
    //other move
    else{
        post_move(bord[button_position])
    }
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
//check
function find_check(color){
    let attacks=[]
    let attack1=[]
    let attack2=[]
    let attack3=[]
    let attack4=[]
    let attack5=[]
    let attack6=[]
    let attack7=[]
    let oponent_king_position=100;
    
    bord.forEach(button => {
        if(button.style.backgroundImage[18]===color){
            const button_position = bord.findIndex(x=>{
                return x === button
            })
            if(button.style.backgroundImage.includes('king')){
                attack1 = king_move(button_position)
            }
            if(button.style.backgroundImage.includes('queen')){
                attack2 = bishop_move(button_position)
                attack3 = rook_move(button_position)
            }
            if(button.style.backgroundImage.includes('bishop')){
                attack4 = attack4.concat(bishop_move(button_position))
            }
            if(button.style.backgroundImage.includes('knight')){
                attack5 = attack5.concat(Knight_move(button_position))
            }
            if(button.style.backgroundImage.includes('rook')){
                attack6 = attack6.concat(rook_move(button_position))
            }
            if(button.style.backgroundImage.includes('b_pawn')){
                if(button_position % 8 === 0){
                    attack7.push(button_position+9)
                }
                else if((button_position+1) % 8 === 0){
                    attack7.push(button_position+7)
                }
                else{
                    attack7.push(button_position+7)
                    attack7.push(button_position+9)
                }
                
            }
            if(button.style.backgroundImage.includes('w_pawn')){
                if(button_position % 8 === 0){
                    attack7.push(button_position-7)
                }
                else if((button_position+1) % 8 === 0){
                    attack7.push(button_position-9)
                }
                else{
                    attack7.push(button_position-7)
                    attack7.push(button_position-9)
                }
            }
        }
        //find oponnent king
        else if(button.style.backgroundImage.includes('king')){
            oponent_king_position = bord.findIndex(x=>{
                return x === button
            })
        }
        else {}
        attacks = [...attack1, ...attack2, ...attack3, ...attack4, ...attack5, ...attack6, ...attack7]
        if(attacks.includes(oponent_king_position)){
            if(color === 'w'){
                check_b = true
            }
            else {
                check_w = true
            }
            bord[oponent_king_position].style.border = '3px solid red'
        }
        else{
            if(color === 'w'){
                check_b = false
            }
            else {
                check_w = false
            }
        }

    })
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
        check_w = false
        check_b = false
        
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
                        x=Knight_move(temp_position)
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
                            check_promotion(button_position)
                        }
                    }
                    text1.innerHTML=x
                }
            }
               
        })
    })
})