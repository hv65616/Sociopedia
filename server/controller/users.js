import User from "../models/User.js";
// Read
export const getuser = async (req, res) => {
  try {
    const id = req.params;
    const user = await User.findById(id);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// read
export const getuserfriends = async (req, res) => {
  try {
    const id = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedfriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedfriends);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// update
export const addremovefriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(friendId);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedfriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedfriends);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
