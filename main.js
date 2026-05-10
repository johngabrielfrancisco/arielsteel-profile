
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  const S = 5;
  const W = 75, H = 46;

  canvas.width = W * S;
  canvas.height = H * S;

  const _ = null;
  const C = {
    T: '#7BC8A4', Td: '#5BAA84',
    RR: '#D04030', Rd: '#A02818', Rl: '#E86050',
    RB: '#8B1A10',
    WW: '#C8C0B0', Ws: '#B0A898', Wl: '#E0D8C8',
    SK: '#F0C898', 
    HR: '#D03020',
    HL: '#F0D060',
    HLd: '#C0A030',
    EY: '#181010',
    OV: '#2060C0', OVd: '#104090',
    BT: '#302828',
    HH: '#606060', HHl: '#888888', HHd: '#404040',
    HW: '#603010',
    BL: '#101010',
    YL: '#F8E020',
    OR: '#F87010',
    WH: '#F8F8F8',
  };

  function px(x, y, col) {
    if (!col) return;
    ctx.fillStyle = col;
    ctx.fillRect(x * S, y * S, S, S);
  }

  function drawScene(frame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < W; x++) {
      for (let y = 0; y < H; y++) {
        px(x, y, C.T);
      }
    }
    for (let x = 0; x < W; x++) {
      const col = (x % 8 < 4) ? C.T : C.Td;
      for (let y = 0; y < H; y++) {
        if ((x + y) % 2 === 0) px(x, y, col);
      }
    }

    for (let y = 0; y <= 25; y++) {
      for (let x = 0; x < W; x++) {
        const shingleRow = Math.floor(y / 5);
        const shingleCol = Math.floor((x + shingleRow * 3) / 8);
        const localY = y % 5;
        const localX = (x + shingleRow * 3) % 8;
        let col = C.RR;
        if (localY === 0) col = C.Rl;
        else if (localY === 4) col = C.Rd;
        if (localX === 0) col = C.Rd;
        px(x, y, col);
      }
    }
    for (let x = 0; x < W; x++) {
      px(x, 26, C.RB);
      px(x, 27, C.WW);
    }
    for (let y = 27; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const brickRow = Math.floor((y - 27) / 4);
        const brickCol = Math.floor((x + brickRow * 5) / 8);
        const localY = (y - 6) % 4;
        const localX = (x + brickRow * 6) % 8;
        let col = C.WW;
        if (localY === 3) col = C.Ws;
        if (localX === 0) col = C.Ws;
        if (localY === 0 && localX === 0) col = C.Wl;
        px(x, y, col);
      }
    }

    const arm = frame < 2 ? 0 : (frame < 5 ? 1 : 0);

    const wx = 32;
    const wy = 14;

    const boots = [
      [wx+2, wy+20, C.BT], [wx+3, wy+20, C.BT],
      [wx+4, wy+20, C.BT], [wx+5, wy+20, C.BT],
      [wx+6, wy+20, C.BT],
      [wx+2, wy+19, C.OV], [wx+3, wy+19, C.OV],
      [wx+5, wy+19, C.OV], [wx+6, wy+19, C.OV],
      [wx+7, wy+19, C.OV],
      [wx+2, wy+18, C.OV], [wx+3, wy+18, C.OV],
      [wx+5, wy+18, C.OV], [wx+6, wy+18, C.OV],
    ];
    boots.forEach(([x,y,c]) => px(x, y, c));

    const torso = [
      [wx+2, wy+17, C.OV], [wx+3, wy+17, C.OV], [wx+4, wy+17, C.OV],
      [wx+5, wy+17, C.OV], [wx+6, wy+17, C.OV], [wx+7, wy+17, C.OV],
      [wx+2, wy+16, C.OV], [wx+3, wy+16, C.OVd], [wx+4, wy+16, C.OVd],
      [wx+5, wy+16, C.OVd], [wx+6, wy+16, C.OVd], [wx+7, wy+16, C.OV],
      [wx+2, wy+15, C.OV], [wx+3, wy+15, C.OVd], [wx+4, wy+15, C.OVd],
      [wx+5, wy+15, C.OVd], [wx+6, wy+15, C.OVd], [wx+7, wy+15, C.OV],
      [wx+2, wy+14, C.OV], [wx+3, wy+14, C.OV], [wx+4, wy+14, C.OV],
      [wx+5, wy+14, C.OV], [wx+6, wy+14, C.OV], [wx+7, wy+14, C.OV],
      [wx+2, wy+13, C.OV], [wx+3, wy+13, C.OV], [wx+4, wy+13, C.OV],
      [wx+5, wy+13, C.OV], [wx+6, wy+13, C.OV], [wx+7, wy+13, C.OV],
    ];
    torso.forEach(([x,y,c]) => px(x, y, c));

    px(wx+1, wy+17, C.SK); px(wx+1, wy+16, C.SK); px(wx+1, wy+15, C.SK);
    px(wx+1, wy+14, C.OV);

    const head = [
      [wx+2, wy+12, C.SK], [wx+3, wy+12, C.SK], [wx+4, wy+12, C.SK],
      [wx+5, wy+12, C.SK], [wx+6, wy+12, C.SK], [wx+7, wy+12, C.SK],
      [wx+2, wy+11, C.SK], [wx+3, wy+11, C.SK], [wx+4, wy+11, C.SK],
      [wx+5, wy+12, C.SK], [wx+6, wy+11, C.SK], [wx+7, wy+11, C.SK],
      [wx+8, wy+11, C.SK],
      [wx+2, wy+10, C.SK], [wx+3, wy+10, C.SK], [wx+4, wy+12, C.SK],
      [wx+5, wy+11, C.EY], [wx+6, wy+10, C.EY], [wx+7, wy+10, C.SK],
      [wx+8, wy+10, C.SK],
      [wx+2, wy+9, C.SK], [wx+3, wy+9, C.SK], [wx+4, wy+9, C.SK],
      [wx+5, wy+9, C.SK], [wx+6, wy+9, C.SK], [wx+7, wy+9, C.SK],
      [wx+8, wy+9, C.SK],
      [wx+3, wy+8, C.SK], [wx+4, wy+8, C.SK], [wx+5, wy+8, C.SK],
      [wx+6, wy+8, C.SK], [wx+6, wy+8, C.SK], [wx+8, wy+8, C.SK],
    ];
    head.forEach(([x,y,c]) => px(x, y, c));

    px(wx+4, wy+15, C.HR);

    const helmet = [
      [wx+2, wy+8, C.HL], [wx+3, wy+7, C.HL], [wx+4, wy+7, C.HL],
      [wx+5, wy+7, C.HL], [wx+6, wy+7, C.HL], [wx+7, wy+7, C.HL],
      [wx+8, wy+7, C.HL],
      [wx+1, wy+6, C.HL], [wx+2, wy+6, C.HLd], [wx+3, wy+6, C.HLd],
      [wx+4, wy+6, C.HLd], [wx+5, wy+6, C.HLd], [wx+6, wy+6, C.HLd],
      [wx+7, wy+6, C.HLd], [wx+8, wy+6, C.HLd], [wx+9, wy+6, C.HL],
      [wx+2, wy+5, C.HL], [wx+3, wy+5, C.HL], [wx+4, wy+5, C.HL],
      [wx+5, wy+5, C.HL], [wx+6, wy+5, C.HL], [wx+7, wy+5, C.HL],
      [wx+8, wy+5, C.HL],
    ];
    helmet.forEach(([x,y,c]) => px(x, y, c));

    if (arm === 0) {
      px(wx+8, wy+13, C.OV); px(wx+9, wy+13, C.OV);
      px(wx+8, wy+14, C.OV); px(wx+9, wy+14, C.OV);
      px(wx+8, wy+15, C.SK); px(wx+9, wy+15, C.SK);
      px(wx+8, wy+16, C.SK); px(wx+9, wy+16, C.SK);
      px(wx+9, wy+17, C.SK); px(wx+10, wy+17, C.SK);
      px(wx+10, wy+16, C.HW); px(wx+11, wy+16, C.HW);
      px(wx+10, wy+15, C.HW); px(wx+11, wy+15, C.HW);
      px(wx+10, wy+14, C.HW); px(wx+11, wy+14, C.HW);
      px(wx+10, wy+13, C.HW); px(wx+11, wy+13, C.HW);
      px(wx+10, wy+12, C.HH); px(wx+11, wy+12, C.HH); px(wx+12, wy+12, C.HH);
      px(wx+10, wy+11, C.HH); px(wx+11, wy+11, C.HH); px(wx+12, wy+11, C.HH);
      px(wx+9,  wy+11, C.HHl); px(wx+13, wy+11, C.HHd);
      px(wx+9,  wy+12, C.HHl); px(wx+13, wy+12, C.HHd);
    } else {
      px(wx+8, wy+13, C.OV); px(wx+9, wy+13, C.OV);
      px(wx+8, wy+14, C.OV); px(wx+9, wy+14, C.OV);
      px(wx+9, wy+15, C.SK); px(wx+10, wy+15, C.SK);
      px(wx+10, wy+14, C.SK); px(wx+11, wy+14, C.SK);
      px(wx+11, wy+13, C.HW); px(wx+12, wy+13, C.HW);
      px(wx+11, wy+12, C.HW); px(wx+12, wy+12, C.HW);
      px(wx+11, wy+11, C.HW); px(wx+12, wy+11, C.HW);
      px(wx+11, wy+10, C.HH); px(wx+12, wy+10, C.HH); px(wx+13, wy+10, C.HH);
      px(wx+11, wy+9, C.HH); px(wx+12, wy+9, C.HH); px(wx+13, wy+9, C.HH);
      px(wx+10, wy+9, C.HHl); px(wx+14, wy+9, C.HHd);
      px(wx+10, wy+10, C.HHl); px(wx+14, wy+10, C.HHd);

      const sparkX = wx + 13, sparkY = wy + 8;
      px(sparkX,   sparkY,   C.YL);
      px(sparkX+1, sparkY-1, C.YL);
      px(sparkX-1, sparkY-1, C.OR);
      px(sparkX+2, sparkY,   C.OR);
      px(sparkX,   sparkY-2, C.WH);
    }

    const outline = [
      [wx+2, wy+4, C.BL], [wx+3, wy+4, C.BL], [wx+4, wy+4, C.BL],
      [wx+5, wy+4, C.BL], [wx+6, wy+4, C.BL], [wx+7, wy+4, C.BL],
      [wx+8, wy+4, C.BL],
      [wx+1, wy+5, C.BL], [wx+9, wy+5, C.BL], [wx+10, wy+6, C.BL],
      [wx+1, wy+7, C.BL], [wx+9, wy+7, C.BL], [wx+10, wy+7, C.BL],
      [wx+1, wy+8, C.BL], [wx+7, wy+8, C.BL], [wx+9, wy+8, C.BL],
      [wx+1, wy+9, C.BL], [wx+9, wy+9, C.BL],
      [wx+1, wy+10, C.BL], [wx+4, wy+10, C.BL], [wx+9, wy+10, C.BL],
      [wx+1, wy+11, C.BL], [wx+9, wy+11, C.BL],
      [wx+1, wy+12, C.BL], [wx+9, wy+12, C.BL],
      [wx+1, wy+13, C.BL], [wx+8, wy+13, C.BL],
      [wx+1, wy+14, C.BL], [wx+8, wy+14, C.BL],
      [wx+0, wy+15, C.BL], [wx+8, wy+15, C.BL],
      [wx+0, wy+16, C.BL], [wx+8, wy+16, C.BL],
      [wx+0, wy+17, C.BL], [wx+8, wy+17, C.BL],
      [wx+1, wy+18, C.BL], [wx+4, wy+18, C.BL], [wx+8, wy+18, C.BL],
      [wx+1, wy+19, C.BL], [wx+4, wy+19, C.BL], [wx+8, wy+19, C.BL],
      [wx+1, wy+21, C.BL], [wx+2, wy+21, C.BL], [wx+3, wy+21, C.BL],
      [wx+4, wy+21, C.BL], [wx+5, wy+21, C.BL], [wx+6, wy+21, C.BL],
      [wx+7, wy+21, C.BL],
    ];
    outline.forEach(([x,y,c]) => px(x, y, c));
  }

  let fi = 0;
  let tick = 0;

  const msgs = ['Building', 'Building.', 'Building..', 'Building...'];
  let mi = 0;
  const txt = document.getElementById('txt');

  function animate(){
    const frame = Math.floor(fi / 3) % 50;
    drawScene(frame);
    fi++;
    tick++;

    if(tick % 120 === 0){
      mi = (mi + 1) % msgs.length; txt.textContent = msgs[mi];
    }

    requestAnimationFrame(animate);
  }
  txt.textContent = msgs[0];

  animate();

});


