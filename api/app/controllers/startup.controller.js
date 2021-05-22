const db = require("../models");
const Startup = db.startup;
const Op = db.Sequelize.Op;

// Create and Save a new startup
exports.create = (req, res) => {
  // Validate request
  if (!req.body.company_name && !req.body.email_address && !req.body.company_password) {
    res.status(400).send({
      message: "company_name, email_address, company_password can not be empty!"
    });
    return;
  }

  // Create a startup
  // use ternary operator to handle null values 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  const startup = {
    company_name: req.body.company_name,
    email_address: req.body.email_address,
    company_password: req.body.company_password ,
    profile_description: req.body.profile_description ? req.body.profile_description :"",
    profile_photo: req.body.profile_photo ? req.body.profile_photo :"",
    cap_table: req.body.cap_table ? req.body.cap_table :"",
    acra_documents: req.body.acra_documents ? req.body.acra_document :"",
    pitch_deck: req.body.pitch_deck ? req.body.pitch_deck :""
  };

  // Save Startup in the database
  Startup.create(startup)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Startup."
      });
    });
  
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const company_name = req.query.company_name;
    var condition = company_name ? { company_name: { [Op.like]: `%${company_name}%` } } : null;
  
    Startup.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Startups."
        });
      });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Startup.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Startup.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Startup was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Startup with id=${id}. Maybe Startup was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Startup with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Startup.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Startup was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Startup with id=${id}. Maybe Startup was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Startup with id=" + id
        });
      });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Startup.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Startup were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Startup."
          });
        });
};

