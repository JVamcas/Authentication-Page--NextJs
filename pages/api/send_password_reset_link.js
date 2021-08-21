
export default function (req, res) {
    const {email} = req

    res.status(200).send({'send': true, 'error': null})
}