var fs = require('fs');

var useStdin = function () {
    var input = process.stdin.read();
    if (input !== null) {
        var inputSplit = input.toString().trim().split(" ");
        if (inputSplit[0] == "cat") {
            //cat <filename>
            catFile(inputSplit[1]);
        } else if (inputSplit[0] == "touch") {
            //touch <filename>
            createNewFile(inputSplit[1]);
        } else if (inputSplit[0] == "rm") {
            deleteFile(inputSplit[1]);
        } else if (inputSplit[0] == "replace") {
            findAndReplace(inputSplit[1], inputSplit[2], inputSplit[3]);
        } else if (inputSplit[0] == "grep") {
            findALine(inputSplit[1], inputSplit[2]);
        }
    }
};

//create a file (touch)
function createNewFile(fileName) {
    fs.writeFile(fileName, "", function (err) {
        if (err) {
            console.log("Could not write to file");
        } else {
            console.log("File created and saved");
        }
    })
}

function deleteFile(fileName) {
    fs.unlink(fileName, function (err) {
        if (err) {
            console.log('delete was not success');
        } else {
            console.log('successfully deleted');
        }
    });
}

//read from a file (cat)
function catFile(fileName) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log("Unable to read from file");
        } else {
            console.log(data.toString());
        }
    });
}

function findAndReplace(fileName, oldWord, newWord) {
    var result;
    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            console.log("Unable to read file");
            console.log(err);
            return;
        }
        result = data.toString().split(oldWord).join(newWord);
        fs.writeFile(fileName, result, function (err) {
            if (err) {
                console.log("There was an error writing to the file.")
                console.log(err);
                return;
            } else {
                console.log("it wrote");
            }
        })
    });
}

function findALine(fileName, wordToFind) {
    fs.readFile(fileName, "utf8", function (err, data) {
        if (err) {
            console.log("Unable to read file");
            console.log(err);
            return;
        } else {
            var myData = data.toString().toLowerCase();
            myData = myData.split("\n");
            var results = [];
            var thereWord = myData[i].split(" ");
            for (var i = 0; i < myData.length; i++) {
                for (var j = 0; j < thereWord.length; j++) {
                    if (wordToFind == thereWord[j]) {
                        results.push(myData[i]);
                    }
                }
            }
            console.log(results);
        }
    });
}

//    read the data 
//    turn into an Array
//    split and filter the array at ./n (new line)
//    console log that line
//    write the new array


process.stdin.on('readable', useStdin);

////hint: "\n" == new line
////opt 1
//for each line: if the line contains the string (hint: indexOf)
//console.log(that line)
////opt 2
//lines.filter(function (item)==>
//return item.indexOf (...) !== -1
//)
//console.log lines
//             
//var newObj = JSON.parse(JSON.stringify(obj));
/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/