const buttons=[]
const promotion_buttons=[]
const rank1=['a1' , 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'] //for promotion and double move.
const rank2=['a9' ,'a10','a11','a12','a13','a14','a15','a16']
const rank7=['a49','a50','a51','a52','a53','a54','a55','a56']
const rank8=['a57','a58','a59','a60','a61','a62','a63','a64']
let previous_button = 'reset'
let previous_button2 = 'z'
let old_piece=''
let temp_button = document.getElementById(`${previous_button}`)
let previous_color = 'b'
let previous_color2 = 'b'
let castle_w = true
let castle_b = true

let check_w = false
let check_b = false
let w_promotion = 'url("image/pieces/w_queen.png")'
let b_promotion = 'url("image/pieces/b_queen.png")'
//set all pieces
const reset_all_pieces = () => {
    //set black pieces
    buttons[0].style.backgroundImage = `url("image/pieces/b_rook.png")`
    buttons[1].style.backgroundImage = `url("image/pieces/b_knight.png")`
    buttons[2].style.backgroundImage = 'url("image/pieces/b_bishop.png")'
    buttons[3].style.backgroundImage = 'url("image/pieces/b_queen.png")'
    buttons[4].style.backgroundImage = 'url("image/pieces/b_king.png")'
    buttons[5].style.backgroundImage = 'url("image/pieces/b_bishop.png")'
    buttons[6].style.backgroundImage = 'url("image/pieces/b_knight.png")'
    buttons[7].style.backgroundImage = 'url("image/pieces/b_rook.png")'
    //set white pieces
    buttons[56].style.backgroundImage = `url("image/pieces/w_rook.png")`
    buttons[57].style.backgroundImage = `url("image/pieces/w_knight.png")`
    buttons[58].style.backgroundImage = 'url("image/pieces/w_bishop.png")'
    buttons[59].style.backgroundImage = 'url("image/pieces/w_queen.png")'
    buttons[60].style.backgroundImage = 'url("image/pieces/w_king.png")'
    buttons[61].style.backgroundImage = 'url("image/pieces/w_bishop.png")'
    buttons[62].style.backgroundImage = 'url("image/pieces/w_knight.png")'
    buttons[63].style.backgroundImage = 'url("image/pieces/w_rook.png")'
    //set pawn
    for(let i=8; i<16; i++){
        buttons[i].style.backgroundImage = `url("image/pieces/b_pawn.png")`
        buttons[i+40].style.backgroundImage = `url("image/pieces/w_pawn.png")`
    }
    //set empty square
    for(let i=16; i<48; i++){
        buttons[i].style.backgroundImage = ''
    }
    document.getElementById("reset").style.backgroundImage = ''
}
//set all promotional pieces
const reset_promotion_pieces = () => {
    //set black pices
    promotion_buttons[0].style.backgroundImage = `url("image/pieces/b_knight.png")`
    promotion_buttons[1].style.backgroundImage = `url("image/pieces/b_bishop.png")`
    promotion_buttons[2].style.backgroundImage = `url("image/pieces/b_rook.png")`
    promotion_buttons[3].style.backgroundImage = `url("image/pieces/b_queen.png")`
    //set white pices
    promotion_buttons[4].style.backgroundImage = `url("image/pieces/w_queen.png")`
    promotion_buttons[5].style.backgroundImage = `url("image/pieces/w_rook.png")`
    promotion_buttons[6].style.backgroundImage = `url("image/pieces/w_bishop.png")`
    promotion_buttons[7].style.backgroundImage = `url("image/pieces/w_knight.png")`
}
//remove border
const remove_border = () => {
    buttons.forEach(button => {
        button.style.border = ''
    })
}
//remove color from promotional button
function remove_color(a){
    promotion_buttons.forEach(button => {
        if(button.style.backgroundImage[18]===a){
            button.style.border = ''
        }
    })
}
function move_reverse(button){
    temp_button.style.backgroundImage = button.style.backgroundImage
    button.style.backgroundImage = old_piece
    previous_button = previous_button2
    previous_color = previous_color2
}
function post_move(button){
    remove_border()
    previous_button2 = previous_button
    previous_color2 = previous_color
    old_piece = button.style.backgroundImage

    button.style.backgroundImage = temp_button.style.backgroundImage
    temp_button.style.backgroundImage = ''
    previous_button = 'reset'
    find_check('w')
    find_check('b')
    if(check_b && (button.style.backgroundImage[18]==='b')){
        move_reverse(button)
    }
    else if(check_w && (button.style.backgroundImage[18]==='w')){
        move_reverse(button)
    }
}
//white castle
function white_castle(button){
    //white short castle
    if(temp_button.style.backgroundImage.includes('w_king') && (temp_button.id==='a61') && 
    (button.id==='a63') && (buttons[61].style.backgroundImage === '') && (buttons[62].style.backgroundImage === '') &&
    (buttons[63].style.backgroundImage.includes('w_rook'))){
        buttons[63].style.backgroundImage =''
        buttons[61].style.backgroundImage = 'url("image/pieces/w_rook.png")'
        castle_w = false
        post_move(button)
    }
    //white long castle
    if(temp_button.style.backgroundImage.includes('w_king') && (temp_button.id==='a61') && 
    (button.id==='a59') && (buttons[57].style.backgroundImage === '') && (buttons[58].style.backgroundImage === '') &&
    (buttons[59].style.backgroundImage === '') && (buttons[56].style.backgroundImage.includes('w_rook'))){
        buttons[56].style.backgroundImage =''
        buttons[59].style.backgroundImage = 'url("image/pieces/w_rook.png")'
        castle_w = false
        post_move(button)
    }
}
//black castle
function black_castle(button){
    //black short castle
    if(temp_button.style.backgroundImage.includes('b_king') && (temp_button.id==='a5') && 
    (button.id==='a7') && (buttons[5].style.backgroundImage === '') && (buttons[6].style.backgroundImage === '') &&
    (buttons[7].style.backgroundImage.includes('b_rook'))){
        buttons[7].style.backgroundImage =''
        buttons[5].style.backgroundImage = 'url("image/pieces/b_rook.png")'
        castle_b = false
        post_move(button)
    }
    //black long castle
    if(temp_button.style.backgroundImage.includes('b_king') && (temp_button.id==='a5') && 
    (button.id==='a3') && (buttons[1].style.backgroundImage === '') && (buttons[2].style.backgroundImage === '') &&
    (buttons[3].style.backgroundImage === '') && (buttons[0].style.backgroundImage.includes('b_rook'))){
        buttons[0].style.backgroundImage =''
        buttons[3].style.backgroundImage = 'url("image/pieces/b_rook.png")'
        castle_b = false
        post_move(button)
    }
}
//select/move pieces
function valid_move(button){
    remove_border()
    button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
    previous_button = button.id
}
function check_update(button){
    remove_border()
    //promotig white
    if((temp_button.style.backgroundImage.includes('w_pawn')) && (rank1.includes(button.id))){
        button.style.backgroundImage = w_promotion
        temp_button.style.backgroundImage = ''
        previous_button = 'reset'
    }
    //promoting black
    else if((temp_button.style.backgroundImage.includes('b_pawn')) && (rank8.includes(button.id))){
        button.style.backgroundImage = b_promotion
        temp_button.style.backgroundImage = ''
        previous_button = 'reset'
    }
    //other move
    else{
        post_move(button)
    }
}
//pawn
function pawn_move(button, button_position ,temp_position,color){
    //move
    if(button.style.backgroundImage ===''){
        if(color==='b'){
            if(temp_position === button_position-8){
                check_update(button)
            }
            else if(rank2.includes(temp_button.id) && (temp_position === button_position-16) && (buttons[temp_position+8].style.backgroundImage ==='')){
                check_update(button)
            }
        }
        if(color==='w'){
            if(temp_position === button_position+8){
                check_update(button)
            }
            else if(rank7.includes(temp_button.id) && (temp_position === button_position+16) && (buttons[temp_position-8].style.backgroundImage ==='')){
                check_update(button)
            }
        }
    }
    //capture
    else {
        if(color==='b'){
            if(temp_position % 8 === 0){
                if(temp_position === button_position-9){
                    check_update(button)
                }
            }
            else if( (temp_position+1) % 8 === 0){
                if(temp_position === button_position-7){
                    check_update(button)
                }
            }
            else {
                if((temp_position === button_position-7) || (temp_position === button_position-9)){
                    check_update(button)
                }
            }
        }
        if(color==='w'){
            if(temp_position % 8 === 0){
                if(temp_position === button_position+7){
                    check_update(button)
                }
            }
            else if( (temp_position+1) % 8 === 0){
                if(temp_position === button_position+9){
                    check_update(button)
                }
            }
            else {
                if((temp_position === button_position+7) || (temp_position === button_position+9)){
                    check_update(button)
                }
            }
        }
    }
}
//king
function king_move(temp_position){
    //normal move
    let moves=[temp_position+1,temp_position-1,temp_position+7,temp_position+8,temp_position+9,temp_position-7,temp_position-8,temp_position-9]
    return moves
}
//knight
function Knight_moves(temp_position) {
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
    return moves
}
//bishop
function bishop_move(temp_position){
    let row = Math.floor(temp_position / 8)
    let col = temp_position % 8
    let moves = []
    for (let i = 1; i < 8; i++){
        // Up-right diagonal
        if (row - i >= 0 && col + i <= 7) {
            let move = (row - i) * 8 + (col + i)
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(temp_button.style.backgroundImage[18] !== buttons[move].style.backgroundImage[18]){
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
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(temp_button.style.backgroundImage[18] !== buttons[move].style.backgroundImage[18]){
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
            let move = (row + i) * 8 + (col + i);
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (buttons[move].style.backgroundImage[18] !== buttons[temp_position].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    for (let i = 1; i < 8; i++) {
        // Down-left diagonal
        if (row + i <= 7 && col - i >= 0) {
            let move = (row + i) * 8 + (col - i);
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (buttons[move].style.backgroundImage[18] !== buttons[temp_position].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    return moves
}
//rook
function rook_move(temp_position){
    let row = Math.floor(temp_position / 8);
    let col = temp_position % 8;
    let moves = [];
    for (let i = 1; i < 8; i++){
        //right
        if (col + i <= 7) {
            let move = (row) * 8 + (col + i);
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(temp_button.style.backgroundImage[18] !== buttons[move].style.backgroundImage[18]){
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
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(temp_button.style.backgroundImage[18] !== buttons[move].style.backgroundImage[18]){
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
            let move = (row - i) * 8 + (col);
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(temp_button.style.backgroundImage[18] !== buttons[move].style.backgroundImage[18]){
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
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (buttons[move].style.backgroundImage[18] !== buttons[temp_position].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    return moves
}
//rook for check
function rook_move_check(temp_position,color){
    let row = Math.floor(temp_position / 8);
    let col = temp_position % 8;
    let moves = [];
    for (let i = 1; i < 8; i++){
        //right
        if (col + i <= 7) {
            let move = (row) * 8 + (col + i);
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== buttons[move].style.backgroundImage[18]){
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
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== buttons[move].style.backgroundImage[18]){
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
            let move = (row - i) * 8 + (col);
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== buttons[move].style.backgroundImage[18]){
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
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (color !== buttons[move].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    return moves
}
// bishop for check
function bishop_move_check(temp_position,color){
    let row = Math.floor(temp_position / 8);
    let col = temp_position % 8;
    let moves = [];
    for (let i = 1; i < 8; i++){
        // Up-right diagonal
        if (row - i >= 0 && col + i <= 7) {
            let move = (row - i) * 8 + (col + i);
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== buttons[move].style.backgroundImage[18]){
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
            if(buttons[move].style.backgroundImage == ''){
                moves.push(move)
            }
            else if(color !== buttons[move].style.backgroundImage[18]){
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
            let move = (row + i) * 8 + (col + i);
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (color !== buttons[move].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    for (let i = 1; i < 8; i++) {
        // Down-left diagonal
        if (row + i <= 7 && col - i >= 0) {
            let move = (row + i) * 8 + (col - i);
            if (buttons[move].style.backgroundImage == '') {
                moves.push(move);
            } 
            else if (color !== buttons[move].style.backgroundImage[18]) {
                moves.push(move);
                break;
            } 
            else {
                break;
            }
        }
    }
    return moves
}
//check
function find_check(color){
    let threads=[]
    let thread1=[]
    let thread2=[]
    let thread3=[]
    let thread4=[]
    let thread5=[]
    let thread6=[]
    let thread7=[]
    let oponent_king_position=100;
    
    buttons.forEach(button => {
        if(button.style.backgroundImage[18]===color){
            const button_position = buttons.findIndex(x=>{
                return x === button
            })
            if(button.style.backgroundImage.includes('king')){
                thread1 = king_move(button_position)
            }
            if(button.style.backgroundImage.includes('queen')){
                thread2 = bishop_move_check(button_position,color)
                thread3 = rook_move_check(button_position,color)
            }
            if(button.style.backgroundImage.includes('bishop')){
                thread4 = thread4.concat(bishop_move_check(button_position,color))
            }
            if(button.style.backgroundImage.includes('knight')){
                thread5 = thread5.concat(Knight_moves(button_position))
            }
            if(button.style.backgroundImage.includes('rook')){
                thread6 = thread6.concat(rook_move_check(button_position,color))
            }
            if(button.style.backgroundImage.includes('b_pawn')){
                if(button_position % 8 === 0){
                    thread7.push(button_position+9)
                }
                else if((button_position+1) % 8 === 0){
                    thread7.push(button_position+7)
                }
                else{
                    thread7.push(button_position+7)
                    thread7.push(button_position+9)
                }
                
            }
            if(button.style.backgroundImage.includes('w_pawn')){
                if(button_position % 8 === 0){
                    thread7.push(button_position-7)
                }
                else if((button_position+1) % 8 === 0){
                    thread7.push(button_position-9)
                }
                else{
                    thread7.push(button_position-7)
                    thread7.push(button_position-9)
                }
            }
        }
        //find oponnent king
        else if(button.style.backgroundImage.includes('king')){
            oponent_king_position = buttons.findIndex(x=>{
                return x === button
            })
        }
        else {}
        threads = [...thread1, ...thread2, ...thread3, ...thread4, ...thread5, ...thread6, ...thread7]
        if(threads.includes(oponent_king_position)){
            if(color === 'w'){
                check_b = true
            }
            else {
                check_w = true
            }
            buttons[oponent_king_position].style.border = '3px solid red'
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
// backgroud music
const backgroud_music = () => {
    document.getElementById("music1").addEventListener("click", function () {
        document.getElementById("audio2").pause()
        document.getElementById("audio1").play()
    })
    document.getElementById("music2").addEventListener("click", function () {
        document.getElementById("audio1").pause()
        document.getElementById("audio2").play()
    })
    document.getElementById("music3").addEventListener("click", function () {
        document.getElementById("audio1").pause()
        document.getElementById("audio2").pause()
    })
}
// backgroud image
const backgroud_change = () => {
    document.getElementById("img1").addEventListener("click", function () {
        document.body.style.backgroundImage = 'url("image/background/night1.jpg")'
    })
    document.getElementById("img2").addEventListener("click", function () {
        document.body.style.backgroundImage = 'url("image/background/anime5.jpg")'
    })
    document.getElementById("img3").addEventListener("click", function () {
        document.body.style.backgroundImage = 'url("image/background/beach1.jpg")'
    })
}
document.addEventListener("DOMContentLoaded", () => {
    //get all 64 buttons
    for (let i = 1; i < 65; i++) {
        const button = document.getElementById(`a${i}`)
        buttons.push(button)
    }
    //get all promotion buttons
    for (let i = 1; i < 9; i++) {
        const button = document.getElementById(`p${i}`)
        promotion_buttons.push(button)
    }
    backgroud_music ()
    backgroud_change ()
    //reset button
    document.getElementById("reset").addEventListener("click", () => {
        remove_border ()
        reset_all_pieces ()
        reset_promotion_pieces ()
        document.getElementById("reset").innerHTML='<h2>Reset</h2>'
        previous_color = 'b'
        previous_button = 'reset'
        castle_w = true
        castle_b = true
        check_w = false
        check_b = false
        w_promotion = 'url("image/pieces/w_queen.png")'
        b_promotion = 'url("image/pieces/b_queen.png")'
        remove_color('w')
        remove_color('b')
    })
    //promotion buttons
    promotion_buttons.forEach(button =>{
        button.addEventListener("click", () =>{
            // white
            if(button.style.backgroundImage[18]==='w'){
                remove_color('w')
                w_promotion = button.style.backgroundImage
                button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
            }
            //black
            if(button.style.backgroundImage[18]==='b'){
                remove_color('b')
                b_promotion = button.style.backgroundImage
                button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
            }
        })
    })
    //bord buttons
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            temp_button = document.getElementById(`${previous_button}`)
            //not capturing same color piece
            if((button.style.backgroundImage != '') && (temp_button.style.backgroundImage != '') && (button.style.backgroundImage[18]==temp_button.style.backgroundImage[18])){
                valid_move(button)
            }
            //check:  same color twice  &&  same button twice
            else if ((previous_color !== button.style.backgroundImage[18]) && (button != temp_button)) {
                //remove color when temp button is empty
                if(temp_button.style.backgroundImage == ''){ 
                    remove_border()
                }
                //select a piece
                if (temp_button.style.backgroundImage == '') {
                    previous_button = button.id
                    if(button.style.backgroundImage !== ''){ //do ot color the empty square
                        button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
                    }
                    //getting previous color
                    if(button.style.backgroundImage!=''){
                        previous_color = button.style.backgroundImage[18]
                    }
                }
                //place a piece if it is not the king
                else if( ! button.style.backgroundImage.includes('king')){
                    let moves = []
                    const button_position = buttons.findIndex(x=>{
                        return x === button
                    })
                    const temp_position = buttons.findIndex(x=>{
                        return x === temp_button
                    })
                    
                    if(temp_button.style.backgroundImage.includes('king')){
                        moves = king_move(temp_position)
                        if (moves.includes(button_position)){
                            if(temp_button.style.backgroundImage[18] === 'w'){
                                castle_w = false
                            }
                            if(temp_button.style.backgroundImage[18] === 'b'){
                                castle_b = false
                            }
                            post_move(button)
                        }
                        //castle
                        else {
                            if(castle_w){
                                white_castle(button)
                            }
                            if(castle_b){
                                black_castle(button)
                            }
                        }
                    }
                    else if(temp_button.style.backgroundImage.includes('queen')){
                        let moves1=[]
                        let moves2=[]
                        // quee move = bishop + rook
                        moves1 = bishop_move(temp_position)
                        moves2 = rook_move(temp_position)
                        moves = [...moves1, ...moves2]
                        if (moves.includes(button_position)){
                            post_move(button)
                        }
                    }
                    else if(temp_button.style.backgroundImage.includes('bishop')){
                        moves = bishop_move(temp_position)
                        if (moves.includes(button_position)){
                            post_move(button)
                        }
                    }
                    else if(temp_button.style.backgroundImage.includes('knight')){
                        moves = Knight_moves(temp_position)
                        if (moves.includes(button_position)){
                            post_move(button)
                        }
                    }
                    else if(temp_button.style.backgroundImage.includes('rook')){
                        moves = rook_move(temp_position)
                        if (moves.includes(button_position)){
                            post_move(button)
                        }
                    }
                    else{ //pawn
                        pawn_move(button, button_position, temp_position, temp_button.style.backgroundImage[18])
                    }
                    //find_check(button.style.backgroundImage[18])
                }
                else{
                    temp_button.style.border = '3px solid rgba(206, 245, 35, 0.9)'
                }
            }
        })
    })
})