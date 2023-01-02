import Court from '@models/court.model';
import { findAllCourts, findOneCourt } from '@services/court.service';

jest.mock("../database/models/court.model", ()=> ({
    init: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn()
}))

describe('Court Service', () => {
    it('return all courts', async () => {
        jest.spyOn(Court, "findAll").mockResolvedValueOnce([]);

        await findAllCourts();

        expect(Court.findAll).toHaveBeenCalled();
    });

    it('return specific court', async () => {
        jest.spyOn(Court, "findOne").mockResolvedValueOnce(null);
        const mockId = 1;

        await findOneCourt(1);

        expect(Court.findOne).toHaveBeenCalledWith({
          where: { id: mockId },
        });
    })
})