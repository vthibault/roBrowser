<?php

/**
* @fileoverview Bmp Loader
* @author Vincent Thibault (alias KeyWorld - Twitter: @robrowser)
* @version 1.0.1
* TODO: for now, RO Emblem doesn't seems to support some bmp features, but maybe in future add support for :
* - 16 and 32 bits image.
* - RLE ?
* - Read other DIBHeader format ?
*/


function imagecreatefrombmpstring($data) {

	// Read header
	extract( unpack("a2signature/x8/Voffset/x4/Vwidth/Vheight/x2/vbits", substr($data, 0, 30)));
	if ($signature !== 'BM') {
		return false;
	}


	// Create image
	$img = imagecreatetruecolor($width, $height);
	imagealphablending($img, false);
	imagesavealpha($img, true);


	// Load palette (if used)
	$paletteSize  = $offset - 54;
	$imagePalette = array();
	if ($paletteSize > 0 && $bits < 16) {
		$palette = unpack('C'. $paletteSize, substr($data, 54, $paletteSize));

		for ($i = 1, $p = 0; $i < $paletteSize; $i += 4) {
			$b = $palette[$i+0];
			$g = $palette[$i+1];
			$r = $palette[$i+2];
			$a = $palette[$i+3];

			// Magenta is transparent.
			if (($r & 0xf8 === 0xf8) && ($g === 0) && ($b & 0xf8 === 0xf8)) {
				$a = 127;
			}

			$imagePalette[$p++] = imagecolorallocatealpha($img, $r, $g, $b, $a);
		}
	}


	// Read ImageData
	$skip      = ( 4 - ( (( ($bits * $width) + 7) >> 3 ) & 3 ) ) % 4;
	$size      = $width * $height * ($bits >> 3) + $skip * $height;
	$imageData = unpack('C'. $size, substr($data, $offset, $size) );


	switch ($bits) {

		// Not an original DIB file ?
		default: return false;

		// 24 bits BMP
		case 24:
			for ($i = 1, $y = $height-1; $y > -1; $y--, $i += $skip) {
				for ($x = 0; $x < $width; $x++, $i+=3) {
					$b = $imageData[$i+0];
					$g = $imageData[$i+1];
					$r = $imageData[$i+2];

					if ($r === 255 && $g === 0 && $b === 255) {
						$c = imagecolorallocatealpha($img, $r, $g, $b, 127);
					}
					else {
						$c = imagecolorallocate($img, $r, $g, $b); 
					}

					imagesetpixel($img, $x, $y, $c );
				}
			}
			break;


		// 8 bits BMP
		case 8:
			for ($i = 1, $y = $height-1; $y > -1; $y--, $i += $skip) {
				for ($x = 0; $x < $width; $x++, $i++) {
					imagesetpixel($img, $x, $y, $imagePalette[$imageData[$i]] );
				}
			}
			break;


		// 4 bits BMP
		case 4:
			for ($i = 1, $y = $height-1; $y > -1; $y--, $i += $skip) {
				for ($x = 0; $x < $width; $x += 2, $i++) {
					$byte = &$imageData[$i];
					imagesetpixel($img, $x+0, $y, $imagePalette[$byte >> 4  ]);
					imagesetpixel($img, $x+1, $y, $imagePalette[$byte & 0x0F]);
				}
			}
			break;


		// 1 bit BMP
		case 1:
			for ($i = 1, $y = $height-1; $y > -1; $y--, $i += $skip) {
				for ($x = 0; $x < $width; $x+=8, $i++) {
					$byte = &$imageData[$i];
					imagesetpixel($img, $x+0, $y, $imagePalette[ !!($byte & 0x80) ]);
					imagesetpixel($img, $x+1, $y, $imagePalette[ !!($byte & 0x40) ]);
					imagesetpixel($img, $x+2, $y, $imagePalette[ !!($byte & 0x20) ]);
					imagesetpixel($img, $x+3, $y, $imagePalette[ !!($byte & 0x10) ]);
					imagesetpixel($img, $x+4, $y, $imagePalette[ !!($byte & 0x08) ]);
					imagesetpixel($img, $x+5, $y, $imagePalette[ !!($byte & 0x04) ]);
					imagesetpixel($img, $x+6, $y, $imagePalette[ !!($byte & 0x02) ]);
					imagesetpixel($img, $x+7, $y, $imagePalette[ !!($byte & 0x01) ]);
				}
			}
			break;
	}


	return $img;
}