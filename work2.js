const piece=['rook','knight','bishop','king','queen','bishop','knight','rook']
let old_bord=[]
let bord=[]
let promotion_list=[]
//set all bord and promotion list piece
const reset_all_pieces = () =>{
    for(let i=0; i<bord.length; i++){
        if(i<8){
            if(i<4){
                promotion_list[i].style.backgroundImage = `url("image/pieces/b_${piece[i+4]}.png")`
                promotion_list[i+4].style.backgroundImage = `url("image/pieces/w_${piece[i+4]}.png")`
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
}
function remove_border(){
    bord.forEach(button=>{
        button.style.border = ''
        button.innerHTML=''
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
//rook for check
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
// bishop for check
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
        reset_all_pieces ()
        remove_border()
        old_bord=[]
    })

    bord.forEach(button => {
        button.addEventListener("click", () => {
            remove_border()
            button.style.border='3px solid rgba(206, 245, 35, 0.9)'
            const button_position = bord.findIndex(x=>{
                return x === button
            })
            //let x=bishop_move(button_position)
            //let x=rook_move(button_position)
            //let x=king_move(button_position)
            //let x=Knight_moves(button_position)
            let x1=bishop_move(button_position)
            let x2=rook_move(button_position)
            let x=[...x1, ...x2]
            x.forEach(Element=>{
                bord[Element].style.border='3px solid rgba(172, 65, 51, 0.9)'
            })
            text3.innerHTML=x
        })
    })
})