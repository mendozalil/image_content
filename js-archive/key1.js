function encrypt(text) {
      const encoder = new TextEncoder();           // UTF-8 bytes
      const bytes = encoder.encode(text);         // Uint8Array
      const encodedBytes = Array.from(bytes, b =>
        b.toString(2).padStart(8, '0')            // "01001000"
          .split('')                              // ['0','1','0',...]
          .map(bit => bit === '1' ? 'O' : '0')    // ['0','O','0',...]
          .join('')                               // "0O0O00O0"
      );
      return encodedBytes.join('o');
    }

    function decrypt(cipher) {
      if (!cipher) return '';
      // filter chunker
      const parts = cipher.split('o').filter(p => p.length > 0);
      const bytes = parts.map(part => {
        // Validate: part should only contain 'O' or '0'
        if (!/^[O0]+$/.test(part)) {
          throw new Error('Cipher contains invalid characters. Only O, 0 and o are allowed.');
        }
        const bitString = part.replace(/O/g, '1').replace(/0/g, '0');
        return parseInt(bitString, 2);
      });
      const decoder = new TextDecoder();
      return decoder.decode(new Uint8Array(bytes));
    }